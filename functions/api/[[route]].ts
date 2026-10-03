// Cloudflare Pages Functions 엔트리포인트 (/api/* 모든 요청 처리)
import { validateNickname, generateCleanNickname } from '../../src/utils/profanityFilter';
import { calculateScore, calculateAccuracy, RankingItem, RankingResponse } from '../../src/types/user';

interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: () => Promise<{ success?: boolean; meta: { changes: number } }>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
}

interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

export interface Env {
  DB?: D1Database;
}

function getCorsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: getCorsHeaders(),
  });
}

function generateDeviceCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 4; i++) {
    part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    part2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VOCA-${part1}-${part2}`;
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders() });
  }

  // 0. 고음질 무료 TTS 오디오 프록시 (/api/tts?text=...&lang=...)
  // 브라우저의 직접 요청 시 발생하는 Referer 차단(404)을 우회하고 모바일 브라우저에 직접 MP3 스트리밍 서빙
  if (url.pathname === '/api/tts' && request.method === 'GET') {
    const text = url.searchParams.get('text')?.trim();
    const lang = url.searchParams.get('lang')?.trim() || 'en';
    if (!text) {
      return jsonResponse({ error: 'Text parameter is required' }, 400);
    }

    const shortLang = lang.startsWith('ja') ? 'ja' : 'en';
    const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${shortLang}&q=${encodeURIComponent(text)}`;

    try {
      const audioResponse = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/',
        },
      });

      if (!audioResponse.ok) {
        return jsonResponse({ error: `TTS upstream returned ${audioResponse.status}` }, 502);
      }

      return new Response(audioResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=604800, immutable',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return jsonResponse({ error: `TTS fetch exception: ${String(err)}` }, 500);
    }
  }

  if (!env.DB) {
    return jsonResponse({
      error: 'D1 database binding is not configured in this environment.',
      fallback: true,
    }, 503);
  }

  try {
    // 1. 기기 코드 기반 로그인 또는 자동 회원가입
    // POST /api/auth/device-login
    if (url.pathname === '/api/auth/device-login' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as {
        deviceCode?: string;
        nickname?: string;
      };

      const now = new Date().toISOString();
      let targetCode = body.deviceCode?.trim().toUpperCase();

      if (targetCode) {
        const existing = await env.DB.prepare(
          'SELECT * FROM users WHERE device_code = ?'
        ).bind(targetCode).first<any>();

        if (existing) {
          await env.DB.prepare(
            'UPDATE users SET last_active_at = ? WHERE id = ?'
          ).bind(now, existing.id).run();

          return jsonResponse({
            success: true,
            user: {
              id: existing.id,
              deviceCode: existing.device_code,
              nickname: existing.nickname,
              correctCount: existing.correct_count,
              incorrectCount: existing.incorrect_count,
              totalScore: existing.total_score,
              accuracy: calculateAccuracy(existing.correct_count, existing.incorrect_count),
              lastActiveAt: now,
              createdAt: existing.created_at,
            },
          });
        }
      }

      if (!targetCode) {
        targetCode = generateDeviceCode();
      }

      let nickname = body.nickname?.trim();
      const nickValidation = nickname ? validateNickname(nickname) : { isValid: false };
      if (!nickValidation.isValid) {
        const shortSuffix = targetCode.split('-').pop() || 'STUDY';
        nickname = generateCleanNickname(shortSuffix);
      }

      const newId = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO users (id, device_code, nickname, correct_count, incorrect_count, total_score, last_active_at, created_at)
         VALUES (?, ?, ?, 0, 0, 0, ?, ?)`
      ).bind(newId, targetCode, nickname, now, now).run();

      return jsonResponse({
        success: true,
        isNew: true,
        user: {
          id: newId,
          deviceCode: targetCode,
          nickname,
          correctCount: 0,
          incorrectCount: 0,
          totalScore: 0,
          accuracy: 0,
          lastActiveAt: now,
          createdAt: now,
        },
      });
    }

    // 2. 닉네임 변경 (비속어 검증)
    // POST /api/user/nickname
    if (url.pathname === '/api/user/nickname' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as {
        deviceCode?: string;
        nickname?: string;
      };

      const targetCode = body.deviceCode?.trim().toUpperCase();
      const targetNickname = body.nickname?.trim();

      if (!targetCode) {
        return jsonResponse({ error: '기기 코드가 필요합니다.' }, 400);
      }

      const validation = validateNickname(targetNickname || '');
      if (!validation.isValid) {
        return jsonResponse({ error: validation.error || '유효하지 않은 닉네임입니다.' }, 400);
      }

      const res = await env.DB.prepare(
        'UPDATE users SET nickname = ?, last_active_at = ? WHERE device_code = ?'
      ).bind(targetNickname, new Date().toISOString(), targetCode).run();

      if (res.meta.changes === 0) {
        return jsonResponse({ error: '사용자를 찾을 수 없습니다.' }, 404);
      }

      return jsonResponse({
        success: true,
        nickname: targetNickname,
      });
    }

    // 3. 점수 및 정답/오답 동기화
    // POST /api/score/sync
    if (url.pathname === '/api/score/sync' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as {
        deviceCode?: string;
        correctDelta?: number;
        incorrectDelta?: number;
        totalCorrect?: number;
        totalIncorrect?: number;
      };

      const targetCode = body.deviceCode?.trim().toUpperCase();
      if (!targetCode) {
        return jsonResponse({ error: '기기 코드가 필요합니다.' }, 400);
      }

      const user = await env.DB.prepare(
        'SELECT * FROM users WHERE device_code = ?'
      ).bind(targetCode).first<any>();

      if (!user) {
        return jsonResponse({ error: '사용자를 찾을 수 없습니다.' }, 404);
      }

      let newCorrect = user.correct_count;
      let newIncorrect = user.incorrect_count;

      if (typeof body.totalCorrect === 'number' && typeof body.totalIncorrect === 'number') {
        newCorrect = Math.max(user.correct_count, body.totalCorrect);
        newIncorrect = Math.max(user.incorrect_count, body.totalIncorrect);
      } else {
        const cDelta = Math.max(0, body.correctDelta || 0);
        const iDelta = Math.max(0, body.incorrectDelta || 0);
        newCorrect += cDelta;
        newIncorrect += iDelta;
      }

      const newScore = calculateScore(newCorrect, newIncorrect);
      const now = new Date().toISOString();

      await env.DB.prepare(
        `UPDATE users 
         SET correct_count = ?, incorrect_count = ?, total_score = ?, last_active_at = ?
         WHERE id = ?`
      ).bind(newCorrect, newIncorrect, newScore, now, user.id).run();

      return jsonResponse({
        success: true,
        user: {
          id: user.id,
          deviceCode: user.device_code,
          nickname: user.nickname,
          correctCount: newCorrect,
          incorrectCount: newIncorrect,
          totalScore: newScore,
          accuracy: calculateAccuracy(newCorrect, newIncorrect),
          lastActiveAt: now,
        },
      });
    }

    // 4. 실시간 랭킹 조회
    // GET /api/ranking
    if (url.pathname === '/api/ranking' && request.method === 'GET') {
      const deviceCode = url.searchParams.get('deviceCode')?.trim().toUpperCase();

      const topRows = await env.DB.prepare(
        `SELECT id, nickname, device_code, correct_count, incorrect_count, total_score, last_active_at
         FROM users
         ORDER BY total_score DESC, correct_count DESC, last_active_at DESC
         LIMIT 50`
      ).all<any>();

      const topRankers: RankingItem[] = (topRows.results || []).map((row: any, index: number) => ({
        rank: index + 1,
        id: row.id,
        nickname: row.nickname,
        shortDeviceCode: row.device_code ? row.device_code.split('-').pop() || '****' : '****',
        totalScore: row.total_score,
        correctCount: row.correct_count,
        incorrectCount: row.incorrect_count,
        accuracy: calculateAccuracy(row.correct_count, row.incorrect_count),
        lastActiveAt: row.last_active_at,
      }));

      const totalRes = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM users'
      ).first<{ count: number }>();
      const totalUsers = totalRes?.count || topRankers.length;

      let myRank: RankingItem | undefined;
      if (deviceCode) {
        const me = await env.DB.prepare(
          'SELECT id, nickname, device_code, correct_count, incorrect_count, total_score, last_active_at FROM users WHERE device_code = ?'
        ).bind(deviceCode).first<any>();

        if (me) {
          const rankRes = await env.DB.prepare(
            `SELECT COUNT(*) + 1 as rank FROM users 
             WHERE total_score > ? OR (total_score = ? AND correct_count > ?)`
          ).bind(me.total_score, me.total_score, me.correct_count).first<{ rank: number }>();

          myRank = {
            rank: rankRes?.rank || 1,
            id: me.id,
            nickname: me.nickname,
            shortDeviceCode: me.device_code.split('-').pop() || '****',
            totalScore: me.total_score,
            correctCount: me.correct_count,
            incorrectCount: me.incorrect_count,
            accuracy: calculateAccuracy(me.correct_count, me.incorrect_count),
            lastActiveAt: me.last_active_at,
          };
        }
      }

      return jsonResponse({
        topRankers,
        myRank,
        totalUsers,
      });
    }

    return jsonResponse({ error: 'API 엔드포인트를 찾을 수 없습니다.' }, 404);
  } catch (err: any) {
    console.error('API Error:', err);
    return jsonResponse({ error: '서버 내부 오류', details: err?.message }, 500);
  }
}

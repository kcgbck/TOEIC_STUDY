// Cloudflare Workers 엔트리포인트 (정적 에셋 서빙 + D1 기반 사용자 계정 및 랭킹 API)
import { validateNickname, generateCleanNickname } from './utils/profanityFilter';
import { calculateScore, calculateAccuracy, RankingItem, RankingResponse } from './types/user';

export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: () => Promise<{ success?: boolean; meta: { changes: number } }>;
  all: <T = unknown>() => Promise<{ results: T[] }>;
}

export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  DB?: D1Database;
}

// CORS 헤더 헬퍼
function getCorsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

// JSON 응답 헬퍼
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: getCorsHeaders(),
  });
}

// 기기 코드 생성 헬퍼 (VOCA-XXXX-XXXX)
function generateDeviceCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // 혼동하기 쉬운 0, 1, I, O 제외
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 4; i++) {
    part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    part2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VOCA-${part1}-${part2}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight 처리
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: getCorsHeaders() });
    }

    // API 라우팅 처리
    if (url.pathname.startsWith('/api/')) {
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
            // 기존 기기 코드로 조회
            const existing = await env.DB.prepare(
              'SELECT * FROM users WHERE device_code = ?'
            ).bind(targetCode).first<any>();

            if (existing) {
              // 최근 활동 시간 갱신
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

          // 신규 기기 코드 발급 및 등록
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

        // 2. 닉네임 변경 (비속어 검증 필수)
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
            // 절대값 동기화 (로컬 통계와 일치시킬 때)
            newCorrect = Math.max(user.correct_count, body.totalCorrect);
            newIncorrect = Math.max(user.incorrect_count, body.totalIncorrect);
          } else {
            // 증분 동기화
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
        // GET /api/ranking?deviceCode=...
        if (url.pathname === '/api/ranking' && request.method === 'GET') {
          const deviceCode = url.searchParams.get('deviceCode')?.trim().toUpperCase();

          // 상위 50명 조회
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

          // 전체 유저 수 조회
          const totalRes = await env.DB.prepare(
            'SELECT COUNT(*) as count FROM users'
          ).first<{ count: number }>();
          const totalUsers = totalRes?.count || topRankers.length;

          // 요청자의 순위 계산
          let myRank: RankingItem | undefined;
          if (deviceCode) {
            const me = await env.DB.prepare(
              'SELECT id, nickname, device_code, correct_count, incorrect_count, total_score, last_active_at FROM users WHERE device_code = ?'
            ).bind(deviceCode).first<any>();

            if (me) {
              // 상위 몇 명인지 카운트 (+1)
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

          const responseData: RankingResponse = {
            topRankers,
            myRank,
            totalUsers,
          };

          return jsonResponse(responseData);
        }

        return jsonResponse({ error: 'API 엔드포인트를 찾을 수 없습니다.' }, 404);
      } catch (err: any) {
        console.error('API Error:', err);
        return jsonResponse({ error: '서버 내부 오류', details: err?.message }, 500);
      }
    }

    // 정적 에셋 서빙 (PWA 빌드 결과물)
    return await env.ASSETS.fetch(request);
  },
};

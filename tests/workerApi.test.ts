import { describe, it, expect, beforeEach } from 'vitest';
import worker, { Env, D1Database } from '../src/worker';

// 인메모리 모의 D1Database 생성기
function createMockD1Database() {
  const usersTable: any[] = [];

  return {
    _users: usersTable,
    prepare(sql: string) {
      return {
        _sql: sql,
        _params: [] as any[],
        bind(...params: any[]) {
          this._params = params;
          return this;
        },
        async first<T = any>(): Promise<T | null> {
          if (this._sql.includes('FROM users WHERE device_code = ?')) {
            const code = this._params[0];
            const found = usersTable.find((u) => u.device_code === code);
            return (found ? { ...found } : null) as T;
          }
          if (this._sql.includes('SELECT COUNT(*) as count FROM users')) {
            return { count: usersTable.length } as T;
          }
          if (this._sql.includes('SELECT COUNT(*) + 1 as rank FROM users')) {
            const [myScore, , myCorrect] = this._params;
            const rank =
              usersTable.filter(
                (u) =>
                  u.total_score > myScore ||
                  (u.total_score === myScore && u.correct_count > myCorrect)
              ).length + 1;
            return { rank } as T;
          }
          return null;
        },
        async all<T = any>(): Promise<{ results: T[] }> {
          if (this._sql.includes('ORDER BY total_score DESC')) {
            const sorted = [...usersTable].sort((a, b) => {
              if (b.total_score !== a.total_score) return b.total_score - a.total_score;
              return b.correct_count - a.correct_count;
            });
            return { results: sorted as T[] };
          }
          return { results: [] };
        },
        async run(): Promise<{ meta: { changes: number } }> {
          if (this._sql.includes('INSERT INTO users')) {
            const [id, device_code, nickname, last_active_at, created_at] = this._params;
            usersTable.push({
              id,
              device_code,
              nickname,
              correct_count: 0,
              incorrect_count: 0,
              total_score: 0,
              last_active_at,
              created_at,
            });
            return { meta: { changes: 1 } };
          }
          if (this._sql.includes('UPDATE users SET last_active_at = ? WHERE id = ?')) {
            const [now, id] = this._params;
            const u = usersTable.find((x) => x.id === id);
            if (u) u.last_active_at = now;
            return { meta: { changes: u ? 1 : 0 } };
          }
          if (this._sql.includes('UPDATE users SET nickname = ?, last_active_at = ? WHERE device_code = ?')) {
            const [nick, now, code] = this._params;
            const u = usersTable.find((x) => x.device_code === code);
            if (u) {
              u.nickname = nick;
              u.last_active_at = now;
              return { meta: { changes: 1 } };
            }
            return { meta: { changes: 0 } };
          }
          if (this._sql.includes('UPDATE users \n             SET correct_count = ?')) {
            const [c, i, score, now, id] = this._params;
            const u = usersTable.find((x) => x.id === id);
            if (u) {
              u.correct_count = c;
              u.incorrect_count = i;
              u.total_score = score;
              u.last_active_at = now;
              return { meta: { changes: 1 } };
            }
            return { meta: { changes: 0 } };
          }
          return { meta: { changes: 0 } };
        },
      };
    },
  } as unknown as D1Database;
}

describe('Cloudflare Worker API 엔드포인트 검증 (workerApi.test.ts)', () => {
  let mockEnv: Env;
  let mockDb: any;

  beforeEach(() => {
    mockDb = createMockD1Database();
    mockEnv = {
      ASSETS: {
        fetch: async () => new Response('Asset Not Found', { status: 404 }),
      },
      DB: mockDb,
    };
  });

  it('POST /api/auth/device-login: 최초 요청 시 기기 코드 및 안전한 닉네임이 자동 생성되어야 한다', async () => {
    const req = new Request('https://voca-study.workers.dev/api/auth/device-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await worker.fetch(req, mockEnv);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.user.deviceCode).toMatch(/^VOCA-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    expect(data.user.totalScore).toBe(0);
    expect(data.user.nickname).toBeTruthy();
  });

  it('POST /api/user/nickname: 비속어가 포함된 닉네임은 400 에러와 함께 거부되어야 한다', async () => {
    // 1. 유저 가입
    const loginRes = await worker.fetch(
      new Request('https://voca-study.workers.dev/api/auth/device-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      mockEnv
    );
    const { user } = await loginRes.json();

    // 2. 비속어로 변경 시도
    const badReq = new Request('https://voca-study.workers.dev/api/user/nickname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceCode: user.deviceCode,
        nickname: '개새끼12',
      }),
    });

    const badRes = await worker.fetch(badReq, mockEnv);
    expect(badRes.status).toBe(400);
    const badData = await badRes.json();
    expect(badData.error).toContain('비속어');

    // 3. 정상 닉네임으로 변경 시도
    const goodReq = new Request('https://voca-study.workers.dev/api/user/nickname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceCode: user.deviceCode,
        nickname: '토익만점기원',
      }),
    });

    const goodRes = await worker.fetch(goodReq, mockEnv);
    expect(goodRes.status).toBe(200);
    const goodData = await goodRes.json();
    expect(goodData.success).toBe(true);
    expect(goodData.nickname).toBe('토익만점기원');
  });

  it('POST /api/score/sync: 맞춘 수(+10)와 틀린 수(-2)로 점수가 정확히 갱신되어야 한다', async () => {
    // 1. 유저 가입
    const loginRes = await worker.fetch(
      new Request('https://voca-study.workers.dev/api/auth/device-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      mockEnv
    );
    const { user } = await loginRes.json();

    // 2. 점수 동기화 (맞춤 5개, 틀림 2개 -> 5*10 - 2*2 = 46점)
    const syncReq = new Request('https://voca-study.workers.dev/api/score/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceCode: user.deviceCode,
        correctDelta: 5,
        incorrectDelta: 2,
      }),
    });

    const syncRes = await worker.fetch(syncReq, mockEnv);
    expect(syncRes.status).toBe(200);

    const syncData = await syncRes.json();
    expect(syncData.user.correctCount).toBe(5);
    expect(syncData.user.incorrectCount).toBe(2);
    expect(syncData.user.totalScore).toBe(46);
    expect(syncData.user.accuracy).toBe(71); // 5/7 = 71%
  });

  it('GET /api/ranking: 점수 순으로 랭킹이 반환되고 내 순위가 계산되어야 한다', async () => {
    // 유저 2명 생성
    const u1Res = await worker.fetch(
      new Request('https://voca-study.workers.dev/api/auth/device-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      mockEnv
    );
    const u1 = (await u1Res.json()).user;

    const u2Res = await worker.fetch(
      new Request('https://voca-study.workers.dev/api/auth/device-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }),
      mockEnv
    );
    const u2 = (await u2Res.json()).user;

    // u1은 10문제 맞춤 (100점), u2는 20문제 맞춤 (200점)
    await worker.fetch(
      new Request('https://voca-study.workers.dev/api/score/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceCode: u1.deviceCode, correctDelta: 10, incorrectDelta: 0 }),
      }),
      mockEnv
    );
    await worker.fetch(
      new Request('https://voca-study.workers.dev/api/score/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceCode: u2.deviceCode, correctDelta: 20, incorrectDelta: 0 }),
      }),
      mockEnv
    );

    // 랭킹 조회 (u1 관점)
    const rankReq = new Request(
      `https://voca-study.workers.dev/api/ranking?deviceCode=${u1.deviceCode}`,
      { method: 'GET' }
    );
    const rankRes = await worker.fetch(rankReq, mockEnv);
    expect(rankRes.status).toBe(200);

    const rankData = await rankRes.json();
    expect(rankData.topRankers.length).toBe(2);
    expect(rankData.topRankers[0].id).toBe(u2.id); // u2가 1위
    expect(rankData.topRankers[1].id).toBe(u1.id); // u1이 2위
    expect(rankData.myRank.rank).toBe(2);
    expect(rankData.myRank.totalScore).toBe(100);
  });

  it('/api/tts 요청 시 text 파라미터가 없으면 400 Bad Request를 반환해야 한다', async () => {
    const ttsReq = new Request('https://voca-study.workers.dev/api/tts', { method: 'GET' });
    const res = await worker.fetch(ttsReq, mockEnv);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Text parameter is required');
  });
});

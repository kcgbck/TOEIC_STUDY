import { describe, it, expect } from 'vitest';
import { calculateScore, calculateAccuracy, RankingItem } from '../src/types/user';

describe('점수 계산 및 랭킹 로직 검증 (rankingScore.test.ts)', () => {
  it('맞춘 횟수는 +10점, 틀린 횟수는 -2점으로 정확히 계산되어야 한다', () => {
    expect(calculateScore(1, 0)).toBe(10);
    expect(calculateScore(10, 0)).toBe(100);
    expect(calculateScore(10, 5)).toBe(90); // 100 - 10
    expect(calculateScore(15, 3)).toBe(144); // 150 - 6
  });

  it('틀린 횟수가 많아도 점수는 0점 미만(음수)으로 내려가지 않아야 한다', () => {
    expect(calculateScore(0, 10)).toBe(0);
    expect(calculateScore(1, 10)).toBe(0); // 10 - 20 = -10 -> 0
    expect(calculateScore(-5, -5)).toBe(0);
  });

  it('정답률(%)이 정확히 계산되어야 한다', () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
    expect(calculateAccuracy(10, 0)).toBe(100);
    expect(calculateAccuracy(8, 2)).toBe(80);
    expect(calculateAccuracy(1, 2)).toBe(33); // 1/3 = 33.3% -> 33%
  });

  it('랭킹 정렬 시 점수 > 맞춘 수 > 정답률 우선순위로 올바르게 정렬되어야 한다', () => {
    const list: RankingItem[] = [
      {
        rank: 0,
        id: 'user-1',
        nickname: 'user1',
        shortDeviceCode: '1111',
        totalScore: 80,
        correctCount: 10,
        incorrectCount: 10,
        accuracy: 50,
        lastActiveAt: '2026-10-02T10:00:00Z',
      },
      {
        rank: 0,
        id: 'user-2',
        nickname: 'user2',
        shortDeviceCode: '2222',
        totalScore: 100,
        correctCount: 10,
        incorrectCount: 0,
        accuracy: 100,
        lastActiveAt: '2026-10-02T10:00:00Z',
      },
      {
        rank: 0,
        id: 'user-3',
        nickname: 'user3',
        shortDeviceCode: '3333',
        totalScore: 80,
        correctCount: 12,
        incorrectCount: 20,
        accuracy: 38,
        lastActiveAt: '2026-10-02T10:00:00Z',
      },
    ];

    const sorted = [...list].sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
      return b.accuracy - a.accuracy;
    });

    expect(sorted[0].id).toBe('user-2'); // 100점
    expect(sorted[1].id).toBe('user-3'); // 80점, 맞춘 수 12개
    expect(sorted[2].id).toBe('user-1'); // 80점, 맞춘 수 10개
  });
});

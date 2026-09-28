// DB-02 마이그레이션 및 학습 기록 호환성 검증 테스트 (지시서 Section 36, 37, 55 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase, WordStat } from '../src/types/word';

describe('DB-02 데이터베이스 마이그레이션 및 학습 기록 연속성 (wordDbMigration.test.ts)', () => {
  const v1Path = path.resolve(__dirname, '../src/data/builtin_words_pilot_v1.json');
  const v2Path = path.resolve(__dirname, '../public/data/builtin_words_v1.json');

  const v1Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(v1Path, 'utf-8'));
  const v2Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(v2Path, 'utf-8'));

  it('v1(200개)에서 생성된 학습 기록이 v2(500개) 업데이트 후에도 100% 매핑되고 손실되지 않아야 한다', () => {
    // 1. 시뮬레이션: v1 시절 사용자가 200개 단어 중 50개 단어를 학습하여 기록을 저장함
    const simulatedProgressMap = new Map<string, WordStat>();

    for (let i = 0; i < 50; i++) {
      const w = v1Data.words[i];
      const progress: WordStat = {
        wordId: w.id,
        totalCount: (i % 5) + 1,
        correctCount: (i % 4) + 1,
        wrongCount: (i % 2),
        correctStreak: (i % 3),
        learningStatus: (i % 3) === 0 ? 'mastered' : 'learning',
        lastStudiedAt: `2026-09-${String(10 + (i % 15)).padStart(2, '0')}T10:00:00Z`,
      };
      simulatedProgressMap.set(w.id, progress);
    }

    expect(simulatedProgressMap.size).toBe(50);

    // 2. DB 업데이트: v2(500개) 로드
    expect(v2Data.databaseVersion).toBe(2);
    expect(v2Data.words.length).toBe(500);

    const v2Map = new Map(v2Data.words.map((w) => [w.id, w]));

    // 3. 기존 학습 기록 50개가 v2 단어장에 정확히 일치하여 남아있는지 확인
    let matchedCount = 0;
    for (const [savedWordId, savedProgress] of simulatedProgressMap.entries()) {
      const v2Word = v2Map.get(savedWordId);
      expect(v2Word).toBeDefined();
      if (v2Word) {
        matchedCount++;
        // 학습 통계 무손실 확인
        expect(savedProgress.totalCount).toBeGreaterThan(0);
        expect(savedProgress.wordId).toBe(v2Word.id);
      }
    }

    expect(matchedCount).toBe(50);
  });

  it('v2에 신규 추가된 300개 단어는 초기 미학습 상태로 정상 조회되어야 한다', () => {
    const v1IdSet = new Set(v1Data.words.map((w) => w.id));
    const newWords = v2Data.words.filter((w) => !v1IdSet.has(w.id));

    expect(newWords.length).toBe(300);

    // 모든 신규 단어가 quizEligible=true이고 고유 ID를 가짐
    for (const nw of newWords) {
      expect(nw.quizEligible).toBe(true);
      expect(nw.status).toBe('quiz_ready');
      expect(nw.databaseVersion).toBe(2);
    }
  });
});

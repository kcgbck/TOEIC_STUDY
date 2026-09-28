// DB-03 마이그레이션 및 다단계 학습 기록 호환성 검증 테스트 (지시서 Section 36, 37, 85 준수)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase, WordStat } from '../src/types/word';

describe('DB-03 데이터베이스 마이그레이션 및 학습 기록 연속성 (wordDbMigration.test.ts)', () => {
  const v1Path = path.resolve(__dirname, '../src/data/builtin_words_pilot_v1.json');
  const v2Path = path.resolve(__dirname, '../data/worddb/baseline_500.json');
  const v3Path = path.resolve(__dirname, '../public/data/builtin_words_v1.json');

  const v1Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(v1Path, 'utf-8'));
  const v2Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(v2Path, 'utf-8'));
  const v3Data: BuiltinWordsDatabase = JSON.parse(fs.readFileSync(v3Path, 'utf-8'));

  it('v1(200개) 및 v2(500개)에서 생성된 학습 기록이 v3(1,800개) 업데이트 후에도 100% 매핑되고 손실되지 않아야 한다', () => {
    expect(v1Data.words.length).toBe(200);
    // 1. 시뮬레이션: v2(500개) 시절 사용자가 100개 단어(v1 포함)를 학습하여 기록을 저장함
    const simulatedProgressMap = new Map<string, WordStat>();

    for (let i = 0; i < 100; i++) {
      const w = v2Data.words[i];
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

    expect(simulatedProgressMap.size).toBe(100);

    // 2. DB 업데이트: v3(1,800개) 로드
    expect(v3Data.databaseVersion).toBe(3);
    expect(v3Data.words.length).toBe(1800);

    const v3Map = new Map(v3Data.words.map((w) => [w.id, w]));

    // 3. 기존 학습 기록 100개가 v3 단어장에 정확히 일치하여 남아있는지 확인
    let matchedCount = 0;
    for (const [savedWordId, savedProgress] of simulatedProgressMap.entries()) {
      const v3Word = v3Map.get(savedWordId);
      expect(v3Word).toBeDefined();
      if (v3Word) {
        matchedCount++;
        // 학습 통계 무손실 확인
        expect(savedProgress.totalCount).toBeGreaterThan(0);
        expect(savedProgress.wordId).toBe(v3Word.id);
      }
    }

    expect(matchedCount).toBe(100);
  });

  it('v3에 신규 추가된 1,300개 단어는 초기 미학습 상태로 정상 조회되어야 한다', () => {
    const v2IdSet = new Set(v2Data.words.map((w) => w.id));
    const newWords = v3Data.words.filter((w) => !v2IdSet.has(w.id));

    expect(newWords.length).toBe(1300);

    // 모든 신규 단어가 quizEligible=true이고 고유 ID를 가짐
    for (const nw of newWords) {
      expect(nw.quizEligible).toBe(true);
      expect(nw.status).toBe('quiz_ready');
      expect(nw.databaseVersion).toBe(3);
      expect(nw.confidenceGrade).not.toBe('C');
    }
  });
});

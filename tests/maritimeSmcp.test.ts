import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createQuizQuestion } from '../src/quiz/quizEngine';
import type { WordEntry } from '../src/types/word';

interface MaritimeDatabase {
  databaseVersion: number;
  name: string;
  category: string;
  phase: string;
  wordCount: number;
  words: Array<{
    id: number;
    word: string;
    partOfSpeech: string;
    meaning: string[];
    englishDefinition?: string;
    difficulty: 'low' | 'medium' | 'high';
    topic: string;
  }>;
}

describe('해사영어 Phase 3 (IMO SMCP + 해기사 3·4급 + 국제협약 실무 451어) 품질 검증', () => {
  const dbPath = path.resolve('public/data/maritime_smcp_v1.json');
  expect(fs.existsSync(dbPath)).toBe(true);

  const raw = fs.readFileSync(dbPath, 'utf-8');
  const db: MaritimeDatabase = JSON.parse(raw);

  it('기본 메타데이터가 Phase 3 지침에 부합해야 한다', () => {
    expect(db.databaseVersion).toBe(3);
    expect(db.category).toBe('maritime_full_master');
    expect(db.phase).toBe('PHASE_3_CONVENTIONS_AND_PRACTICE_EXPANSION');
    expect(db.words.length).toBeGreaterThanOrEqual(450);
    expect(db.wordCount).toBe(db.words.length);
  });

  it('모든 단어는 중복이 없고, 뜻과 품사가 유효해야 한다', () => {
    const seenWords = new Set<string>();
    const validDifficulties = new Set(['low', 'medium', 'high']);

    for (const item of db.words) {
      const lower = item.word.trim().toLowerCase();
      expect(seenWords.has(lower)).toBe(false);
      seenWords.add(lower);

      expect(item.word.length).toBeGreaterThan(0);
      expect(item.meaning.length).toBeGreaterThan(0);
      for (const m of item.meaning) {
        expect(m.trim().length).toBeGreaterThan(0);
      }

      expect(validDifficulties.has(item.difficulty)).toBe(true);
      expect(item.partOfSpeech.trim().length).toBeGreaterThan(0);
    }
  });

  it('4지선다 출제 엔진에서 정답 유일성 Hard Gate를 100% 통과해야 한다', () => {
    const wordEntries: WordEntry[] = db.words.map((w) => ({
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: w.partOfSpeech,
      difficulty: w.difficulty === 'low' ? 'low' : w.difficulty === 'high' ? 'high' : 'medium',
      topic: w.topic,
    }));

    let successCount = 0;
    // Phase 1(SMCP), Phase 2(해기사), Phase 3(국제협약)을 고르게 포함하는 120개 샘플 단어에 대해 출제 시험
    const sampleWords = [
      ...wordEntries.slice(0, 40),
      ...wordEntries.slice(174, 214),
      ...wordEntries.slice(345, 385),
    ];

    for (let i = 0; i < sampleWords.length; i++) {
      const target = sampleWords[i];
      const question = createQuizQuestion(wordEntries, target, {
        seed: 3000 + i,
        matchPartOfSpeech: true,
      });

      expect(question).not.toBeNull();
      if (question) {
        expect(question.options.length).toBe(4);
        expect(new Set(question.options).size).toBe(4); // 4개 보기 중복 없음
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThanOrEqual(3);
        successCount++;
      }
    }

    expect(successCount).toBe(sampleWords.length);
  });
});

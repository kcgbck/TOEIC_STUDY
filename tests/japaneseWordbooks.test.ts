import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { createQuizQuestion } from '../src/quiz/quizEngine';
import type { WordEntry } from '../src/types/word';

describe('일본어 문제집 데이터 무결성 및 정답 유일성 검증 (tests/japaneseWordbooks.test.ts)', () => {
  const examPath = path.join(__dirname, '../public/data/builtin_japanese_exam.json');
  const lifePath = path.join(__dirname, '../public/data/builtin_japanese_life.json');

  it('시험용 및 생활일본어 JSON 파일이 존재하고 150단어 이상 수록되어야 한다', () => {
    expect(fs.existsSync(examPath)).toBe(true);
    expect(fs.existsSync(lifePath)).toBe(true);

    const examData = JSON.parse(fs.readFileSync(examPath, 'utf-8'));
    const lifeData = JSON.parse(fs.readFileSync(lifePath, 'utf-8'));

    expect(examData.words.length).toBeGreaterThanOrEqual(150);
    expect(lifeData.words.length).toBeGreaterThanOrEqual(150);
  });

  it('시험용 일본어 단어장 4지선다 출제 시 정답 유일성이 100% 보장되어야 한다', () => {
    const examData = JSON.parse(fs.readFileSync(examPath, 'utf-8'));
    const entries: WordEntry[] = examData.words.map((w: any) => ({
      id: String(w.id),
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: w.partOfSpeech,
      difficulty: w.difficulty,
      topic: w.topic,
    }));

    // 전체 단어에 대해 퀴즈 생성 테스트
    for (let i = 0; i < entries.length; i++) {
      const target = entries[i];
      const q = createQuizQuestion(entries, target, { seed: 1000 + i });
      expect(q).not.toBeNull();
      if (q) {
        expect(q.options.length).toBe(4);
        // 정답 인덱스가 올바른지 확인
        const correctMeaning = target.meaning[0];
        expect(q.options[q.correctIndex]).toBe(correctMeaning);
        // 4개 보기에 중복이 없어야 함
        const uniqueSet = new Set(q.options);
        expect(uniqueSet.size).toBe(4);
      }
    }
  });

  it('생활일본어 단어장 4지선다 출제 시 정답 유일성이 100% 보장되어야 한다', () => {
    const lifeData = JSON.parse(fs.readFileSync(lifePath, 'utf-8'));
    const entries: WordEntry[] = lifeData.words.map((w: any) => ({
      id: String(w.id),
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: w.partOfSpeech,
      difficulty: w.difficulty,
      topic: w.topic,
    }));

    for (let i = 0; i < entries.length; i++) {
      const target = entries[i];
      const q = createQuizQuestion(entries, target, { seed: 2000 + i });
      expect(q).not.toBeNull();
      if (q) {
        expect(q.options.length).toBe(4);
        const correctMeaning = target.meaning[0];
        expect(q.options[q.correctIndex]).toBe(correctMeaning);
        const uniqueSet = new Set(q.options);
        expect(uniqueSet.size).toBe(4);
      }
    }
  });
});

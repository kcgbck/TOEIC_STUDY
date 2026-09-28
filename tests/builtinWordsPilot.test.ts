// DB-PILOT-200 기본 어휘 데이터베이스 검증 테스트 (지시서 DB-PILOT-200 Section 25~28)
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { BuiltinWordsDatabase } from '../src/types/word';
import { builtinWordToWordEntry } from '../src/types/word';
import { createQuizQuestion, validateQuestionUniqueness } from '../src/quiz/quizEngine';

describe('DB-PILOT-200 기본 어휘 데이터베이스 검증', () => {
  const jsonPath = path.resolve(__dirname, '../src/data/builtin_words_pilot_v1.json');
  expect(fs.existsSync(jsonPath)).toBe(true);

  const rawJson = fs.readFileSync(jsonPath, 'utf-8');
  const dbData: BuiltinWordsDatabase = JSON.parse(rawJson);
  const words = dbData.words;

  it('출제 가능 어휘 수가 200개 이상이어야 한다 (지시서 6, 19항)', () => {
    expect(words.length).toBeGreaterThanOrEqual(200);
    const readyWords = words.filter((w) => w.quizEligible && w.status === 'quiz_ready');
    expect(readyWords.length).toBeGreaterThanOrEqual(200);
  });

  it('C등급 단어가 출시 데이터에 포함되지 않아야 한다 (지시서 18, 19항)', () => {
    const cWords = words.filter((w) => w.confidenceGrade === 'C');
    expect(cWords.length).toBe(0);
  });

  it('모든 단어의 표제어, 대표 뜻, 품사, 주제가 누락되지 않아야 한다 (지시서 8, 9항)', () => {
    for (const w of words) {
      expect(w.word.trim().length).toBeGreaterThan(0);
      expect(w.mainMeaning.trim().length).toBeGreaterThan(0);
      expect(['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction']).toContain(w.partOfSpeech);
      expect(w.topics.length).toBeGreaterThan(0);
    }
  });

  it('모든 단어의 ID가 고유하며 builtin:word:pos 규칙을 따라야 한다 (지시서 10항)', () => {
    const ids = new Set<string>();
    for (const w of words) {
      expect(w.id).toMatch(/^builtin:[a-z_]+:[a-z]+$/);
      expect(ids.has(w.id)).toBe(false);
      ids.add(w.id);
    }
  });

  it('15개 필수 주제군이 고르게 분포되어야 한다 (지시서 7항)', () => {
    const requiredTopics = [
      '회사/사무', '채용/인사', '회의/일정', '금융/회계', '판매/마케팅',
      '구매/주문', '배송/물류', '여행/교통', '호텔/식당', '시설/건물',
      '고객서비스', '생산/제조', '기술/장비', '교육/행사', '일반'
    ];

    const topicCounts: Record<string, number> = {};
    for (const w of words) {
      for (const t of w.topics) {
        topicCounts[t] = (topicCounts[t] || 0) + 1;
      }
    }

    for (const req of requiredTopics) {
      expect(topicCounts[req]).toBeGreaterThanOrEqual(5);
    }
  });

  it('4대 주요 품사(명사, 동사, 형용사, 부사)가 모두 포함되어야 한다 (지시서 8항)', () => {
    const posCounts: Record<string, number> = {};
    for (const w of words) {
      posCounts[w.partOfSpeech] = (posCounts[w.partOfSpeech] || 0) + 1;
    }

    expect(posCounts['noun']).toBeGreaterThanOrEqual(30);
    expect(posCounts['verb']).toBeGreaterThanOrEqual(30);
    expect(posCounts['adjective']).toBeGreaterThanOrEqual(20);
    expect(posCounts['adverb']).toBeGreaterThanOrEqual(15);
  });

  it('샘플 어휘 30개에 대해 4지선다 유일성 및 안전성 검증을 통과해야 한다 (지시서 28항)', () => {
    const entries = words.map(builtinWordToWordEntry);
    const sampleWords = words.slice(0, 30);

    for (let i = 0; i < sampleWords.length; i++) {
      const bWord = sampleWords[i];
      const entry = entries[i];
      const q = createQuizQuestion(entries, entry, { seed: 1000 + i, matchPartOfSpeech: true });

      expect(q).not.toBeNull();
      if (q) {
        const val = validateQuestionUniqueness(q, [bWord.mainMeaning, ...bWord.subMeanings]);
        expect(val.isValid).toBe(true);
        expect(q.options.length).toBe(4);
        expect(q.options[q.correctIndex]).toBe(bWord.mainMeaning);
      }
    }
  });
});

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createQuizQuestion, validateQuestionUniqueness } from '../src/quiz/quizEngine';
import type { WordEntry, QuizQuestion } from '../src/types/word';

describe('P0-B 4지선다 출제 품질 및 정답 유일성 Hard Gate (지시서 Section 20~28)', () => {
  // 테스트 단어 풀 준비 (합성 어휘 + 기본 어휘)
  const mockVocabulary: WordEntry[] = [
    { id: '1', word: 'acquire', meaning: ['획득하다', '습득하다'], partOfSpeech: '동사', difficulty: 'medium', topic: 'toeic' },
    { id: '2', word: 'purchase', meaning: ['구매하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    { id: '3', word: 'buy', meaning: ['구입하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    { id: '4', word: 'confirm', meaning: ['확인하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    { id: '5', word: 'identify', meaning: ['알아보다', '식별하다'], partOfSpeech: '동사', difficulty: 'medium', topic: 'toeic' },
    { id: '6', word: 'postpone', meaning: ['연기하다'], partOfSpeech: '동사', difficulty: 'medium', topic: 'toeic' },
    { id: '7', word: 'deliver', meaning: ['배송하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    { id: '8', word: 'apply', meaning: ['지원하다', '적용하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    { id: '9', word: 'expand', meaning: ['확장하다'], partOfSpeech: '동사', difficulty: 'medium', topic: 'toeic' },
    { id: '10', word: 'terminate', meaning: ['종결시키다'], partOfSpeech: '동사', difficulty: 'high', topic: 'toeic' },
    { id: '11', word: 'delegate', meaning: ['위임하다'], partOfSpeech: '동사', difficulty: 'high', topic: 'toeic' },
    { id: '12', word: 'condition', meaning: ['조건'], partOfSpeech: '명사', difficulty: 'low', topic: 'toeic' },
    { id: '13', word: 'employment', meaning: ['고용'], partOfSpeech: '명사', difficulty: 'low', topic: 'toeic' },
    { id: '14', word: 'candidate', meaning: ['후보자'], partOfSpeech: '명사', difficulty: 'low', topic: 'toeic' },
    { id: '15', word: 'invoice', meaning: ['청구서'], partOfSpeech: '명사', difficulty: 'medium', topic: 'toeic' },
    { id: '16', word: 'lack', meaning: ['부족'], partOfSpeech: '명사', difficulty: 'low', topic: 'toeic' },
    { id: '17', word: 'diligent', meaning: ['성실한', '근면한'], partOfSpeech: '형용사', difficulty: 'medium', topic: 'toeic' },
    { id: '18', word: 'eligible', meaning: ['자격이있는'], partOfSpeech: '형용사', difficulty: 'high', topic: 'toeic' },
    { id: '19', word: 'mandatory', meaning: ['의무적인'], partOfSpeech: '형용사', difficulty: 'high', topic: 'toeic' },
    { id: '20', word: 'familiar', meaning: ['친숙한'], partOfSpeech: '형용사', difficulty: 'low', topic: 'toeic' },
  ];

  it('[Hard Gate 검증] validateQuestionUniqueness가 비정상 문제를 정확히 차단해야 한다', () => {
    // 1. 보기 수가 4개가 아닌 경우 차단
    const invalidCount: QuizQuestion = {
      wordId: '1',
      word: 'test',
      options: ['A', 'B', 'C'],
      correctIndex: 0,
      difficulty: 'medium',
    };
    expect(validateQuestionUniqueness(invalidCount).isValid).toBe(false);

    // 2. 보기 문자열 중복 차단
    const duplicateOptions: QuizQuestion = {
      wordId: '1',
      word: 'test',
      options: ['A', 'B', 'B', 'D'],
      correctIndex: 0,
      difficulty: 'medium',
    };
    expect(validateQuestionUniqueness(duplicateOptions).isValid).toBe(false);

    // 3. 정답 인덱스 범위 초과 차단
    const invalidIndex: QuizQuestion = {
      wordId: '1',
      word: 'test',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 4,
      difficulty: 'medium',
    };
    expect(validateQuestionUniqueness(invalidIndex).isValid).toBe(false);

    // 4. BLOCK 동의어가 오답에 포함된 경우 차단
    const blockSynonym: QuizQuestion = {
      wordId: '1',
      word: 'purchase',
      options: ['구매하다', '구입하다', '지원하다', '연기하다'], // 구입하다는 구매하다의 동의어!
      correctIndex: 0,
      difficulty: 'low',
    };
    expect(validateQuestionUniqueness(blockSynonym, ['구매하다']).isValid).toBe(false);

    // 5. 정답의 추가 뜻(다의어)이 오답에 포함된 경우 차단
    const polysemyDistractor: QuizQuestion = {
      wordId: '1',
      word: 'acquire',
      options: ['획득하다', '습득하다', '지원하다', '연기하다'], // 습득하다는 acquire의 추가 뜻!
      correctIndex: 0,
      difficulty: 'medium',
    };
    expect(validateQuestionUniqueness(polysemyDistractor, ['획득하다', '습득하다']).isValid).toBe(false);

    // 6. 정상 문제 통과
    const validQuestion: QuizQuestion = {
      wordId: '1',
      word: 'acquire',
      options: ['획득하다', '지원하다', '연기하다', '배송하다'],
      correctIndex: 0,
      difficulty: 'medium',
    };
    expect(validateQuestionUniqueness(validQuestion, ['획득하다', '습득하다']).isValid).toBe(true);
  });


  it('[1,000회 반복 시험] 1,000회 문제 생성 시 결함(중복/BLOCK/누락) 0건이어야 한다 (지시서 27항)', () => {
    let successCount = 0;
    let failedGateCount = 0;

    for (let i = 0; i < 1000; i++) {
      const targetWord = mockVocabulary[i % mockVocabulary.length];
      const seed = 100000 + i; // 고정된 seed로 재현성 확보

      const question = createQuizQuestion(mockVocabulary, targetWord, { seed });
      expect(question).not.toBeNull();

      const validation = validateQuestionUniqueness(
        question!,
        Array.isArray(targetWord.meaning) ? targetWord.meaning : [targetWord.meaning]
      );

      if (!validation.isValid) {
        failedGateCount++;
        console.error(`1000회 시험 실패 (seed=${seed}): ${validation.reason}`);
      } else {
        successCount++;
      }

      // 필수 관문 검증
      expect(question!.options.length).toBe(4);
      expect(new Set(question!.options).size).toBe(4);
      expect(question!.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question!.correctIndex).toBeLessThan(4);
    }

    expect(failedGateCount).toBe(0);
    expect(successCount).toBe(1000);
  });

  it('[PDF 100단어 출제 시험] 100단어 전체에 대해 정답 유일성 문제를 생성해야 한다 (지시서 28항)', async () => {
    const samplePdfPath = path.resolve(__dirname, '../docs/샘플.pdf');
    let wordList: WordEntry[] = [];

    if (fs.existsSync(samplePdfPath)) {
      const { extractVocabularyFromPdf } = await import('../src/pdf/pdfParser');
      const fileBuffer = fs.readFileSync(samplePdfPath);
      const result = await extractVocabularyFromPdf(fileBuffer.buffer);
      wordList = result.extractedWords.map((w, idx) => ({
        id: `pdf_w_${idx}`,
        word: w.word,
        meaning: [w.meaning],
        partOfSpeech: w.partOfSpeech || '명사',
        difficulty: 'medium' as const,
        topic: 'toeic',
      }));

    } else {
      wordList = mockVocabulary;
    }

    expect(wordList.length).toBeGreaterThanOrEqual(20);

    let generatedCount = 0;
    let failCount = 0;

    for (let i = 0; i < wordList.length; i++) {
      const target = wordList[i];
      const q = createQuizQuestion(wordList, target, { seed: 5000 + i });
      if (q) {
        const val = validateQuestionUniqueness(
          q,
          Array.isArray(target.meaning) ? target.meaning : [target.meaning]
        );
        expect(val.isValid).toBe(true);
        expect(q.options.length).toBe(4);
        expect(new Set(q.options).size).toBe(4);
        generatedCount++;
      } else {
        failCount++;
      }
    }

    expect(failCount).toBe(0);
    expect(generatedCount).toBe(wordList.length);
  });

});

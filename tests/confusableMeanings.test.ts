import { describe, it, expect } from 'vitest';
import { evaluateDistractorSafety } from '../src/quiz/synonymDictionary';
import { createQuizQuestion, validateQuestionUniqueness } from '../src/quiz/quizEngine';
import type { WordEntry } from '../src/types/word';

describe('P0-B 동의어 및 다의어 의미 중복 차단 (지시서 Section 23~25)', () => {
  it('정답과 동일한 문자열 또는 포함 관계는 BLOCK되어야 한다', () => {
    expect(evaluateDistractorSafety(['구매하다'], '구매하다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['획득하다'], '획득하다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['책임이 있는'], '책임')).toBe('BLOCK');
  });

  it('사전에 등록된 유의어/동의어는 BLOCK되어야 한다 (지시서 23항)', () => {
    // "구매하다" <-> "구입하다", "사다"
    expect(evaluateDistractorSafety(['구매하다'], '구입하다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['구매하다'], '사다')).toBe('BLOCK');

    // "획득하다" <-> "얻다", "취득하다", "습득하다"
    expect(evaluateDistractorSafety(['획득하다'], '얻다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['획득하다'], '취득하다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['획득하다'], '습득하다')).toBe('BLOCK');

    // "성실한" <-> "근면한", "부지런한"
    expect(evaluateDistractorSafety(['성실한'], '근면한')).toBe('BLOCK');
    expect(evaluateDistractorSafety(['성실한'], '부지런한')).toBe('BLOCK');

    // "확인하다" <-> "알아보다", "점검하다"
    expect(evaluateDistractorSafety(['확인하다'], '알아보다')).toBe('BLOCK');
  });

  it('정답 단어의 추가 뜻(다의어)을 다른 단어의 오답 보기로 사용하는 것을 원천 차단해야 한다 (지시서 24항)', () => {
    // acquire: 획득하다, 습득하다 (정답 단어)
    // learn: 배우다, 습득하다 (다른 단어)
    // 정답 단어가 acquire일 때, learn의 뜻인 "습득하다"가 오답 보기로 나오면 복수정답이 되므로 BLOCK되어야 함!
    const targetMeanings = ['획득하다', '습득하다'];
    expect(evaluateDistractorSafety(targetMeanings, '습득하다')).toBe('BLOCK');
    expect(evaluateDistractorSafety(targetMeanings, '취득하다')).toBe('BLOCK'); // 습득하다의 동의어
    expect(evaluateDistractorSafety(targetMeanings, '지원하다')).toBe('SAFE');
  });

  it('명확히 다른 의미의 단어는 SAFE로 판정되어야 한다', () => {
    expect(evaluateDistractorSafety(['구매하다'], '지원하다')).toBe('SAFE');
    expect(evaluateDistractorSafety(['구매하다'], '연기하다')).toBe('SAFE');
    expect(evaluateDistractorSafety(['획득하다'], '배송하다')).toBe('SAFE');
    expect(evaluateDistractorSafety(['조건'], '확인하다')).toBe('SAFE');
  });

  it('실제 문제 생성 시 BLOCK 동의어가 오답으로 섞여 들어가지 않아야 한다', () => {
    const mockWords: WordEntry[] = [
      { id: '1', word: 'purchase', meaning: ['구매하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
      { id: '2', word: 'buy', meaning: ['구입하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
      { id: '3', word: 'apply', meaning: ['지원하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
      { id: '4', word: 'postpone', meaning: ['연기하다'], partOfSpeech: '동사', difficulty: 'medium', topic: 'toeic' },
      { id: '5', word: 'deliver', meaning: ['배송하다'], partOfSpeech: '동사', difficulty: 'low', topic: 'toeic' },
    ];


    // purchase 문제 생성: 오답에 buy의 "구입하다"가 절대 들어가선 안 됨!
    const q = createQuizQuestion(mockWords, mockWords[0], { seed: 42 });
    expect(q).not.toBeNull();
    expect(q!.options).toContain('구매하다');
    expect(q!.options).not.toContain('구입하다'); // BLOCK 동의어 배제 확인!
    expect(q!.options).toContain('지원하다');
    expect(q!.options).toContain('연기하다');
    expect(q!.options).toContain('배송하다');

    const validation = validateQuestionUniqueness(q!, ['구매하다']);
    expect(validation.isValid).toBe(true);
  });
});

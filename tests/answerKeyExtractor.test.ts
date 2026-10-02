// GATE-4: 별도 정답표 파서 및 문항 자동 매핑 테스트 (지시서 20, 51, 52, 71, 76항)
import { describe, it, expect } from 'vitest';
import { extractAnswerKeys, mapAnswerKeysToQuestions } from '../src/ocr/answerKeyExtractor';
import type { RecognizedTextBlock } from '../src/types/ocr';
import type { QuestionItem } from '../src/types/question';

describe('GATE-4 별도 정답표 추출 및 문항 매핑 (answerKeyExtractor.test.ts)', () => {
  it('단일 및 다중 행 정답표로부터 문제 번호와 정답 라벨을 정확히 추출해야 한다', () => {
    const answerKeyBlocks: RecognizedTextBlock[] = [
      { text: '1 ③   2 ①   3 ④   4 ②', x: 20, y: 10, width: 350, height: 20, confidence: 0.95 },
      { text: '5 ⑤   6 ③   7 ②   8 ④', x: 20, y: 35, width: 350, height: 20, confidence: 0.92 },
      { text: '9. 1', x: 20, y: 60, width: 60, height: 20, confidence: 0.9 },
      { text: '10 - C', x: 20, y: 85, width: 80, height: 20, confidence: 0.9 },
    ];

    const keys = extractAnswerKeys(answerKeyBlocks);
    expect(keys.length).toBe(10);

    expect(keys[0].questionNumber).toBe('1');
    expect(keys[0].answerNumber).toBe(3); // ③

    expect(keys[1].questionNumber).toBe('2');
    expect(keys[1].answerNumber).toBe(1); // ①

    expect(keys[4].questionNumber).toBe('5');
    expect(keys[4].answerNumber).toBe(5); // ⑤

    expect(keys[8].questionNumber).toBe('9');
    expect(keys[8].answerNumber).toBe(1); // 1

    expect(keys[9].questionNumber).toBe('10');
    expect(keys[9].answerNumber).toBe(3); // C = 3
  });

  it('추출된 정답표를 정답이 없던 QuestionItem 목록에 정확히 매핑하여 verified로 전환해야 한다', () => {
    const rawQuestions: QuestionItem[] = [
      {
        id: 'q-1',
        bookId: 'book-1',
        questionNumber: '1',
        stem: '문제 1번 본문',
        choiceCount: 4,
        choices: [
          { id: 'c1-1', sourceLabel: '①', text: '보기1' },
          { id: 'c1-2', sourceLabel: '②', text: '보기2' },
          { id: 'c1-3', sourceLabel: '③', text: '보기3' },
          { id: 'c1-4', sourceLabel: '④', text: '보기4' },
        ],
        answerStatus: 'missing',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'low',
        isUserConfirmed: false,
        createdAt: '2026-10-02T10:00:00Z',
      },
      {
        id: 'q-2',
        bookId: 'book-1',
        questionNumber: '2',
        stem: '문제 2번 본문',
        choiceCount: 4,
        choices: [
          { id: 'c2-1', sourceLabel: '①', text: '선택A' },
          { id: 'c2-2', sourceLabel: '②', text: '선택B' },
          { id: 'c2-3', sourceLabel: '③', text: '선택C' },
          { id: 'c2-4', sourceLabel: '④', text: '선택D' },
        ],
        answerStatus: 'missing',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'low',
        isUserConfirmed: false,
        createdAt: '2026-10-02T10:00:00Z',
      },
    ];

    const answerKeys = [
      { questionNumber: '1', answerLabel: '③', answerNumber: 3, rawLine: '1 ③', confidence: 0.95 },
      { questionNumber: '2', answerLabel: '①', answerNumber: 1, rawLine: '2 ①', confidence: 0.92 },
    ];

    const result = mapAnswerKeysToQuestions(rawQuestions, answerKeys);
    expect(result.matchedCount).toBe(2);
    expect(result.unmatchedQuestionCount).toBe(0);
    expect(result.hasConflicts).toBe(false);

    // 문제 1번 검증: 3번 보기(c1-3)로 연결
    const mapped1 = result.mappedQuestions[0];
    expect(mapped1.correctChoiceId).toBe('c1-3');
    expect(mapped1.answerStatus).toBe('verified');
    expect(mapped1.answerEvidence?.type).toBe('ANSWER_KEY');
    expect(mapped1.isUserConfirmed).toBe(true);

    // 문제 2번 검증: 1번 보기(c2-1)로 연결
    const mapped2 = result.mappedQuestions[1];
    expect(mapped2.correctChoiceId).toBe('c2-1');
    expect(mapped2.answerStatus).toBe('verified');
    expect(mapped2.answerEvidence?.type).toBe('ANSWER_KEY');
  });

  it('4지선다 문항에 정답표가 5번으로 지정된 경우 범위를 초과하여 needs_review로 보류해야 한다 (지시서 51항)', () => {
    const rawQuestion: QuestionItem = {
      id: 'q-3',
      bookId: 'book-1',
      questionNumber: '3',
      stem: '문제 3번',
      choiceCount: 4, // 4지선다
      choices: [
        { id: 'c3-1', sourceLabel: '①', text: '보기1' },
        { id: 'c3-2', sourceLabel: '②', text: '보기2' },
        { id: 'c3-3', sourceLabel: '③', text: '보기3' },
        { id: 'c3-4', sourceLabel: '④', text: '보기4' },
      ],
      answerStatus: 'missing',
      questionConfidence: 'high',
      choicesConfidence: 'high',
      answerConfidence: 'low',
      isUserConfirmed: false,
      createdAt: '2026-10-02T10:00:00Z',
    };

    const answerKeys = [
      { questionNumber: '3', answerLabel: '⑤', answerNumber: 5, rawLine: '3 ⑤', confidence: 0.9 }, // 5번 정답
    ];

    const result = mapAnswerKeysToQuestions([rawQuestion], answerKeys);
    expect(result.hasConflicts).toBe(true);
    expect(result.matchedCount).toBe(0);
    expect(result.mappedQuestions[0].answerStatus).toBe('needs_review');
    expect(result.warnings.some((w) => w.includes('초과'))).toBe(true);
  });

  it('번호가 없는 임시 문항은 정답표 자동 매핑에서 안전하게 배제되어야 한다 (지시서 52항)', () => {
    const tempQuestion: QuestionItem = {
      id: 'q-temp-1',
      bookId: 'book-1',
      questionNumber: '', // 번호 없음
      stem: '임시 문항',
      choiceCount: 4,
      choices: [
        { id: 'ct-1', sourceLabel: '①', text: '보기1' },
        { id: 'ct-2', sourceLabel: '②', text: '보기2' },
        { id: 'ct-3', sourceLabel: '③', text: '보기3' },
        { id: 'ct-4', sourceLabel: '④', text: '보기4' },
      ],
      answerStatus: 'missing',
      questionConfidence: 'medium',
      choicesConfidence: 'medium',
      answerConfidence: 'low',
      isUserConfirmed: false,
      createdAt: '2026-10-02T10:00:00Z',
    };

    const answerKeys = [
      { questionNumber: '1', answerLabel: '①', answerNumber: 1, rawLine: '1 ①', confidence: 0.9 },
    ];

    const result = mapAnswerKeysToQuestions([tempQuestion], answerKeys);
    expect(result.matchedCount).toBe(0);
    expect(result.mappedQuestions[0].correctChoiceId).toBeUndefined();
    expect(result.mappedQuestions[0].answerStatus).toBe('missing');
  });
});

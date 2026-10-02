// GATE-2: 4/5지선다 출제 셔플 엔진 및 20,000회 스트레스 테스트 (지시서 45, 46, 69, 78항)
import { describe, it, expect } from 'vitest';
import {
  createGeneralQuizQuestion,
  createGeneralQuizSession,
  validateGeneralQuestion,
} from '../src/quiz/generalQuizEngine';
import type { QuestionItem } from '../src/types/question';
import { SimplePrng } from '../src/quiz/quizEngine';

describe('GATE-2 4지선다 및 5지선다 셔플 스트레스 테스트 (generalQuestionShuffle.test.ts)', () => {
  const sample4ChoiceQuestion: QuestionItem = {
    id: 'q4-sample-1',
    bookId: 'book-1',
    questionNumber: '1',
    stem: '다음 중 TCP/IP 4계층 모델에 속하지 않는 계층은?',
    choiceCount: 4,
    choices: [
      { id: 'c-app', sourceLabel: '①', text: '응용 계층' },
      { id: 'c-trans', sourceLabel: '②', text: '전송 계층' },
      { id: 'c-pres', sourceLabel: '③', text: '표현 계층' }, // 정답
      { id: 'c-net', sourceLabel: '④', text: '인터넷 계층' },
    ],
    correctChoiceId: 'c-pres', // 원본 3번
    answerStatus: 'verified',
    questionConfidence: 'high',
    choicesConfidence: 'high',
    answerConfidence: 'high',
    isUserConfirmed: true,
    createdAt: '2026-10-02T10:00:00Z',
  };

  const sample5ChoiceQuestion: QuestionItem = {
    id: 'q5-sample-1',
    bookId: 'book-1',
    questionNumber: '2',
    stem: '다음 중 데이터베이스 트랜잭션의 ACID 특성에 해당하지 않는 것은?',
    choiceCount: 5,
    choices: [
      { id: 'c-atom', sourceLabel: '①', text: '원자성 (Atomicity)' },
      { id: 'c-cons', sourceLabel: '②', text: '일관성 (Consistency)' },
      { id: 'c-isol', sourceLabel: '③', text: '격리성 (Isolation)' },
      { id: 'c-dur', sourceLabel: '④', text: '지속성 (Durability)' },
      { id: 'c-scal', sourceLabel: '⑤', text: '확장성 (Scalability)' }, // 정답
    ],
    correctChoiceId: 'c-scal', // 원본 5번
    answerStatus: 'verified',
    questionConfidence: 'high',
    choicesConfidence: 'high',
    answerConfidence: 'high',
    isUserConfirmed: true,
    createdAt: '2026-10-02T10:00:00Z',
  };

  it('4지선다 문항에 대해 10,000회 연속 셔플 시 정답 손실 0건 및 위치 분산 검증', () => {
    const prng = new SimplePrng(987654321);
    const indexDistribution = [0, 0, 0, 0];
    const totalTrials = 10000;

    for (let i = 0; i < totalTrials; i++) {
      const q = createGeneralQuizQuestion(sample4ChoiceQuestion, i + 1, {
        shuffleChoices: true,
        prng,
      });

      expect(q).not.toBeNull();
      if (!q) continue;

      // Hard Gate 검증
      const val = validateGeneralQuestion(q);
      expect(val.isValid).toBe(true);

      // 선택지 수 = 4
      expect(q.choices.length).toBe(4);

      // 정답 일치율 100%: displayCorrectIndex의 선택지가 항상 c-pres이어야 함
      expect(q.choices[q.displayCorrectIndex].id).toBe('c-pres');
      expect(q.choices[q.displayCorrectIndex].text).toBe('표현 계층');

      // 중복 0 확인
      const ids = new Set(q.choices.map((c) => c.id));
      expect(ids.size).toBe(4);

      indexDistribution[q.displayCorrectIndex]++;
    }

    // 각 위치(0, 1, 2, 3)로 골고루 분산되었는지 확인 (대략 25% ± 5%)
    for (let idx = 0; idx < 4; idx++) {
      const ratio = indexDistribution[idx] / totalTrials;
      expect(ratio).toBeGreaterThan(0.20);
      expect(ratio).toBeLessThan(0.30);
    }
  });

  it('5지선다 문항에 대해 10,000회 연속 셔플 시 정답 손실 0건 및 위치 분산 검증', () => {
    const prng = new SimplePrng(123456789);
    const indexDistribution = [0, 0, 0, 0, 0];
    const totalTrials = 10000;

    for (let i = 0; i < totalTrials; i++) {
      const q = createGeneralQuizQuestion(sample5ChoiceQuestion, i + 1, {
        shuffleChoices: true,
        prng,
      });

      expect(q).not.toBeNull();
      if (!q) continue;

      // Hard Gate 검증
      const val = validateGeneralQuestion(q);
      expect(val.isValid).toBe(true);

      // 선택지 수 = 5
      expect(q.choices.length).toBe(5);

      // 정답 일치율 100%: displayCorrectIndex의 선택지가 항상 c-scal이어야 함
      expect(q.choices[q.displayCorrectIndex].id).toBe('c-scal');
      expect(q.choices[q.displayCorrectIndex].text).toBe('확장성 (Scalability)');

      // 중복 0 확인
      const ids = new Set(q.choices.map((c) => c.id));
      expect(ids.size).toBe(5);

      indexDistribution[q.displayCorrectIndex]++;
    }

    // 각 위치(0, 1, 2, 3, 4)로 골고루 분산되었는지 확인 (대략 20% ± 5%)
    for (let idx = 0; idx < 5; idx++) {
      const ratio = indexDistribution[idx] / totalTrials;
      expect(ratio).toBeGreaterThan(0.15);
      expect(ratio).toBeLessThan(0.25);
    }
  });

  it('문제 순서 셔플과 보기 순서 셔플을 독립적으로 제어할 수 있어야 한다', () => {
    const questions: QuestionItem[] = [
      { ...sample4ChoiceQuestion, id: 'q-1', questionNumber: '1' },
      { ...sample5ChoiceQuestion, id: 'q-2', questionNumber: '2' },
      {
        ...sample4ChoiceQuestion,
        id: 'q-3',
        questionNumber: '3',
        stem: '문제 3번',
        correctChoiceId: 'c-app',
      },
    ];

    // 1. 문제 순서 유지 (shuffleQuestions = false), 보기만 셔플
    const session1 = createGeneralQuizSession(questions, {
      shuffleQuestions: false,
      shuffleChoices: true,
      seed: 42,
    });

    expect(session1.length).toBe(3);
    expect(session1.map((q) => q.originalQuestionNumber)).toEqual(['1', '2', '3']);
    // 보기들은 셔플되었으나 정답 보존
    session1.forEach((q) => {
      expect(q.choices[q.displayCorrectIndex].id).toBe(q.correctChoiceId);
    });

    // 2. 정답 없는 문제(missing)는 자동 출제 세션에서 제외되어야 한다 (지시서 21, 50항)
    const questionsWithMissing: QuestionItem[] = [
      ...questions,
      {
        ...sample4ChoiceQuestion,
        id: 'q-missing',
        questionNumber: '99',
        correctChoiceId: undefined,
        answerStatus: 'missing',
        isUserConfirmed: false,
      },
    ];

    const session2 = createGeneralQuizSession(questionsWithMissing, {
      shuffleQuestions: false,
    });
    expect(session2.length).toBe(3); // missing 문제는 제외됨
    expect(session2.find((q) => q.id === 'q-missing')).toBeUndefined();
  });
});

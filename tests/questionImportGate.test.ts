// GATE-6: 자동 저장 Hard Gate 및 OCR 품질 평가 테스트 (지시서 50, 73, 76, 79항)
import { describe, it, expect } from 'vitest';
import { analyzeImageQuality } from '../src/ocr/imagePreprocessor';
import { calculateOcrQualityMetrics, type ExpectedQuestionReference } from '../src/ocr/ocrBenchmark';
import { createGeneralQuizSession } from '../src/quiz/generalQuizEngine';
import type { QuestionItem } from '../src/types/question';

describe('GATE-6 자동 저장 Hard Gate 및 품질 지표 (questionImportGate.test.ts)', () => {
  it('자동 저장 Hard Gate: 불완전 문항(stem 누락, 보기 부족, 정답 미확인)은 자동 출제 세션에 포함되지 않아야 한다 (지시서 50항)', () => {
    const invalidQuestions: QuestionItem[] = [
      // 1. stem empty
      {
        id: 'q-bad-1',
        bookId: 'book-1',
        stem: '', // 비어있음
        choiceCount: 4,
        choices: [
          { id: 'c1', sourceLabel: '①', text: '보기1' },
          { id: 'c2', sourceLabel: '②', text: '보기2' },
          { id: 'c3', sourceLabel: '③', text: '보기3' },
          { id: 'c4', sourceLabel: '④', text: '보기4' },
        ],
        correctChoiceId: 'c1',
        answerStatus: 'verified',
        questionConfidence: 'low',
        choicesConfidence: 'high',
        answerConfidence: 'high',
        isUserConfirmed: false,
        createdAt: '2026-10-02T10:00:00Z',
      },
      // 2. choice < 4 (보기 3개)
      {
        id: 'q-bad-2',
        bookId: 'book-1',
        stem: '보기 3개 문제',
        choiceCount: 4,
        choices: [
          { id: 'c1', sourceLabel: '①', text: '보기1' },
          { id: 'c2', sourceLabel: '②', text: '보기2' },
          { id: 'c3', sourceLabel: '③', text: '보기3' },
        ],
        correctChoiceId: 'c1',
        answerStatus: 'verified',
        questionConfidence: 'high',
        choicesConfidence: 'low',
        answerConfidence: 'high',
        isUserConfirmed: false,
        createdAt: '2026-10-02T10:00:00Z',
      },
      // 3. correctChoiceId missing
      {
        id: 'q-bad-3',
        bookId: 'book-1',
        stem: '정답 없는 문제',
        choiceCount: 4,
        choices: [
          { id: 'c1', sourceLabel: '①', text: '보기1' },
          { id: 'c2', sourceLabel: '②', text: '보기2' },
          { id: 'c3', sourceLabel: '③', text: '보기3' },
          { id: 'c4', sourceLabel: '④', text: '보기4' },
        ],
        correctChoiceId: undefined, // 정답 없음
        answerStatus: 'missing',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'low',
        isUserConfirmed: false,
        createdAt: '2026-10-02T10:00:00Z',
      },
      // 4. 정상 검증된 문항
      {
        id: 'q-good-4',
        bookId: 'book-1',
        stem: '정상 문항',
        choiceCount: 4,
        choices: [
          { id: 'c1', sourceLabel: '①', text: '보기1' },
          { id: 'c2', sourceLabel: '②', text: '보기2' },
          { id: 'c3', sourceLabel: '③', text: '보기3' },
          { id: 'c4', sourceLabel: '④', text: '보기4' },
        ],
        correctChoiceId: 'c2',
        answerStatus: 'verified',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'high',
        isUserConfirmed: true,
        createdAt: '2026-10-02T10:00:00Z',
      },
    ];

    // 자동 출제 세션 생성 시 정상 문항 1개만 포함되어야 함
    const session = createGeneralQuizSession(invalidQuestions);
    expect(session.length).toBe(1);
    expect(session[0].id).toBe('q-good-4');
  });

  it('사용자가 직접 확인(isUserConfirmed = true)하면 needs_review 상태의 문항도 안전하게 출제 가능해야 한다', () => {
    const questionWithUserConfirm: QuestionItem = {
      id: 'q-user-confirmed',
      bookId: 'book-1',
      stem: '사용자가 검토 후 확인한 문제',
      choiceCount: 4,
      choices: [
        { id: 'c1', sourceLabel: '①', text: '보기1' },
        { id: 'c2', sourceLabel: '②', text: '보기2' },
        { id: 'c3', sourceLabel: '③', text: '보기3' },
        { id: 'c4', sourceLabel: '④', text: '보기4' },
      ],
      correctChoiceId: 'c3',
      answerStatus: 'needs_review', // 초기 상태는 needs_review
      questionConfidence: 'medium',
      choicesConfidence: 'medium',
      answerConfidence: 'medium',
      isUserConfirmed: true, // 사용자가 확인 완료
      createdAt: '2026-10-02T10:00:00Z',
    };

    const session = createGeneralQuizSession([questionWithUserConfirm]);
    expect(session.length).toBe(1);
    expect(session[0].id).toBe('q-user-confirmed');
    expect(session[0].choices[session[0].displayCorrectIndex].id).toBe('c3');
  });

  it('이미지 품질 분석기가 저해상도와 극단적 밝기/그림자를 올바르게 진단해야 한다', () => {
    // 1. 저해상도 테스트 (400x300)
    const lowResPixels = new Uint8ClampedArray(400 * 300 * 4);
    const lowReport = analyzeImageQuality(400, 300, lowResPixels);
    expect(lowReport.resolutionStatus).toBe('low');
    expect(lowReport.recommendations.some((r) => r.includes('해상도'))).toBe(true);

    // 2. 고해상도 + 정상 밝기 테스트 (1920x1080, 중간 회색)
    const normalPixels = new Uint8ClampedArray(1920 * 1080 * 4);
    for (let i = 0; i < normalPixels.length; i += 4) {
      normalPixels[i] = 128;
      normalPixels[i + 1] = 128;
      normalPixels[i + 2] = 128;
      normalPixels[i + 3] = 255;
    }
    const normReport = analyzeImageQuality(1920, 1080, normalPixels);
    expect(normReport.resolutionStatus).toBe('high');
    expect(normReport.averageBrightness).toBe(128);
  });

  it('OCR 벤치마크 평가기에서 자동 승인 오류가 0건임을 검증해야 한다 (지시서 79항)', () => {
    const references: ExpectedQuestionReference[] = [
      { questionNumber: '1', expectedStemKeywords: ['운영체제'], expectedChoiceCount: 4, expectedAnswerNumber: 2 },
      { questionNumber: '2', expectedStemKeywords: ['프로세스'], expectedChoiceCount: 4, expectedAnswerNumber: 1 },
    ];

    const actualQuestions: QuestionItem[] = [
      {
        id: 'q-1',
        bookId: 'b-1',
        questionNumber: '1',
        stem: '운영체제의 목적',
        choiceCount: 4,
        choices: [
          { id: 'c1-1', sourceLabel: '①', text: '보기1' },
          { id: 'c1-2', sourceLabel: '②', text: '보기2' }, // 정답 2번
          { id: 'c1-3', sourceLabel: '③', text: '보기3' },
          { id: 'c1-4', sourceLabel: '④', text: '보기4' },
        ],
        correctChoiceId: 'c1-2',
        answerStatus: 'verified',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'high',
        isUserConfirmed: true,
        createdAt: '2026-10-02T10:00:00Z',
      },
      {
        id: 'q-2',
        bookId: 'b-1',
        questionNumber: '2',
        stem: '프로세스 전이',
        choiceCount: 4,
        choices: [
          { id: 'c2-1', sourceLabel: '①', text: '보기1' }, // 정답 1번
          { id: 'c2-2', sourceLabel: '②', text: '보기2' },
          { id: 'c2-3', sourceLabel: '③', text: '보기3' },
          { id: 'c2-4', sourceLabel: '④', text: '보기4' },
        ],
        correctChoiceId: 'c2-1',
        answerStatus: 'verified',
        questionConfidence: 'high',
        choicesConfidence: 'high',
        answerConfidence: 'high',
        isUserConfirmed: true,
        createdAt: '2026-10-02T10:00:00Z',
      },
    ];

    const metrics = calculateOcrQualityMetrics(actualQuestions, references);
    expect(metrics.totalQuestions).toBe(2);
    expect(metrics.questionNumberRecall).toBe(1.0);
    expect(metrics.autoApprovalErrors).toBe(0); // 자동 승인 오류 = 0
    expect(metrics.answerMappingAccuracy).toBe(1.0);
  });
});

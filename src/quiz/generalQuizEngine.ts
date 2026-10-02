// 범용 객관식 문제(4지/5지선다) 출제 및 셔플 엔진 (GEN-01 지시서 5~9, 42~46항 준수)
import type { QuestionItem, QuestionChoice } from '../types/question';
import { SimplePrng } from './quizEngine';

export interface GeneralQuizOptions {
  shuffleQuestions?: boolean; // 문제 순서 랜덤 셔플 여부
  shuffleChoices?: boolean; // 보기 순서 랜덤 셔플 여부
  seed?: number;
  limit?: number; // 출제 문제 수
}

export interface DisplayChoice {
  id: string;
  sourceLabel: string; // 원본 라벨 (예: ①, 1, A)
  displayLabel: string; // 출제 시 표시 라벨 (1, 2, 3, 4, 5 또는 ①, ②, ③...)
  text: string;
}

export interface GeneralQuizQuestion {
  id: string;
  bookId: string;
  originalQuestionNumber?: string;
  displayNumber: number; // 1부터 시작하는 세션 내 출제 번호
  stem: string;
  choiceCount: 4 | 5;
  choices: DisplayChoice[];
  correctChoiceId?: string;
  displayCorrectIndex: number; // 셔플된 choices 배열 내 정답 인덱스 (0-based)
  explanation?: string;
  sourceImageId?: string;
  sourceBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface GeneralQuizValidationResult {
  isValid: boolean;
  reason?: string;
}

const CIRCLE_LABELS = ['①', '②', '③', '④', '⑤'];

/**
 * 4/5지선다 Hard Gate 검증 (지시서 45항)
 * 1. 선택지 수 = 4 또는 5
 * 2. choiceId 중복 = 0
 * 3. correctChoiceId 존재 = 1
 * 4. 표시 정답 위치 = 1 (displayCorrectIndex 유효)
 * 5. 빈 선택지 = 0
 */
export function validateGeneralQuestion(
  question: GeneralQuizQuestion
): GeneralQuizValidationResult {
  // 1. 선택지 수 = 4 또는 5
  if (!question.choices || (question.choices.length !== 4 && question.choices.length !== 5)) {
    return {
      isValid: false,
      reason: `선택지 수는 4개 또는 5개여야 합니다 (현재: ${question.choices?.length}개)`,
    };
  }

  // 2. choiceId 중복 = 0
  const idSet = new Set(question.choices.map((c) => c.id));
  if (idSet.size !== question.choices.length) {
    return {
      isValid: false,
      reason: `선택지 ID에 중복이 존재합니다 (${idSet.size}/${question.choices.length})`,
    };
  }

  // 3. 빈 선택지 = 0
  for (let i = 0; i < question.choices.length; i++) {
    const c = question.choices[i];
    if (!c.text || c.text.trim().length === 0) {
      return {
        isValid: false,
        reason: `${i + 1}번째 선택지 본문이 비어있습니다`,
      };
    }
  }

  // 4. correctChoiceId 및 displayCorrectIndex 일치 확인
  if (!question.correctChoiceId) {
    return {
      isValid: false,
      reason: '정답 선택지 ID(correctChoiceId)가 지정되지 않았습니다',
    };
  }

  if (
    question.displayCorrectIndex < 0 ||
    question.displayCorrectIndex >= question.choices.length
  ) {
    return {
      isValid: false,
      reason: `표시 정답 위치가 유효 범위를 벗어났습니다 (${question.displayCorrectIndex})`,
    };
  }

  const correctChoice = question.choices[question.displayCorrectIndex];
  if (!correctChoice || correctChoice.id !== question.correctChoiceId) {
    return {
      isValid: false,
      reason: `표시 정답 인덱스(${question.displayCorrectIndex})의 선택지 ID(${correctChoice?.id})가 원래 정답 ID(${question.correctChoiceId})와 불일치합니다`,
    };
  }

  return { isValid: true };
}

/**
 * 단일 QuestionItem을 출제용 GeneralQuizQuestion으로 변환 및 셔플
 */
export function createGeneralQuizQuestion(
  item: QuestionItem,
  displayNumber: number,
  options: { shuffleChoices?: boolean; prng?: SimplePrng } = {}
): GeneralQuizQuestion | null {
  if (!item.stem || !item.choices || (item.choices.length !== 4 && item.choices.length !== 5)) {
    return null;
  }

  // 정답 ID가 없으면 출제 불가 (지시서 21, 50항)
  if (!item.correctChoiceId) {
    return null;
  }

  const prng = options.prng || new SimplePrng(Date.now() + displayNumber);

  // 보기 셔플 여부
  let processedChoices: QuestionChoice[];
  if (options.shuffleChoices !== false) {
    processedChoices = prng.shuffle(item.choices);
  } else {
    processedChoices = [...item.choices];
  }

  // correctChoiceId 위치 검색하여 displayCorrectIndex 동적 계산 (지시서 6, 9항)
  const displayCorrectIndex = processedChoices.findIndex(
    (c) => c.id === item.correctChoiceId
  );

  if (displayCorrectIndex === -1) {
    // 원본 선택지에 correctChoiceId가 없는 경우 치명적 결함
    return null;
  }

  const displayChoices: DisplayChoice[] = processedChoices.map((c, idx) => ({
    id: c.id,
    sourceLabel: c.sourceLabel,
    displayLabel: CIRCLE_LABELS[idx] || String(idx + 1),
    text: c.text,
  }));

  const quizQuestion: GeneralQuizQuestion = {
    id: item.id || `q-${displayNumber}`,
    bookId: item.bookId,
    originalQuestionNumber: item.questionNumber,
    displayNumber,
    stem: item.stem,
    choiceCount: processedChoices.length as 4 | 5,
    choices: displayChoices,
    correctChoiceId: item.correctChoiceId,
    displayCorrectIndex,
    explanation: item.explanation,
    sourceImageId: item.sourceImageId,
    sourceBounds: item.sourceBounds,
  };

  const validation = validateGeneralQuestion(quizQuestion);
  if (!validation.isValid) {
    return null;
  }

  return quizQuestion;
}

/**
 * QuestionItem 배열로부터 전체 퀴즈 출제 세션 생성
 */
export function createGeneralQuizSession(
  questions: QuestionItem[],
  options: GeneralQuizOptions = {}
): GeneralQuizQuestion[] {
  if (!questions || questions.length === 0) return [];

  // 1. 유효 출제 가능 문항만 필터링 (정답 있고 검증/확인되었거나 출제 가능한 상태)
  const eligibleQuestions = questions.filter(
    (q) => q.correctChoiceId && (q.answerStatus === 'verified' || q.isUserConfirmed)
  );

  if (eligibleQuestions.length === 0) return [];

  const prng = new SimplePrng(options.seed !== undefined ? options.seed : Date.now());

  // 2. 문제 순서 셔플
  let orderedQuestions: QuestionItem[];
  if (options.shuffleQuestions !== false) {
    orderedQuestions = prng.shuffle(eligibleQuestions);
  } else {
    orderedQuestions = [...eligibleQuestions];
  }

  // 3. 문제 수 제한
  if (options.limit && options.limit > 0 && options.limit < orderedQuestions.length) {
    orderedQuestions = orderedQuestions.slice(0, options.limit);
  }

  // 4. 각 문제별 보기 셔플 및 Hard Gate 검증
  const session: GeneralQuizQuestion[] = [];
  for (let i = 0; i < orderedQuestions.length; i++) {
    const q = createGeneralQuizQuestion(orderedQuestions[i], i + 1, {
      shuffleChoices: options.shuffleChoices !== false,
      prng,
    });
    if (q) {
      session.push(q);
    }
  }

  return session;
}

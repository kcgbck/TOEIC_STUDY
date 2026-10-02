// OCR 품질 평가 지표 및 벤치마크 계산기 (GEN-01 지시서 32, 79항 준수)
import type { QuestionItem } from '../types/question';

export interface OcrQualityMetrics {
  totalQuestions: number;
  questionNumberRecall: number; // 0.0 ~ 1.0 (목표: >= 0.95)
  stemCompletenessRate: number; // 0.0 ~ 1.0 (목표: >= 0.90)
  choicesExtractionRate: number; // 0.0 ~ 1.0 (목표: >= 0.95)
  answerMappingAccuracy: number; // 0.0 ~ 1.0 (목표: 1.0)
  autoApprovalErrors: number; // 절대 0이어야 함 (지시서 65, 79항)
  needsReviewRate: number; // 0.0 ~ 1.0
  verifiedCount: number;
  needsReviewCount: number;
  missingCount: number;
}

export interface ExpectedQuestionReference {
  questionNumber: string;
  expectedStemKeywords: string[];
  expectedChoiceCount: 4 | 5;
  expectedAnswerNumber?: number;
}

/**
 * 추출된 QuestionItem 목록을 기준 정답과 대조하여 품질 지표 산출
 */
export function calculateOcrQualityMetrics(
  actualQuestions: QuestionItem[],
  expectedReferences: ExpectedQuestionReference[]
): OcrQualityMetrics {
  const total = expectedReferences.length;
  if (total === 0) {
    return {
      totalQuestions: 0,
      questionNumberRecall: 1,
      stemCompletenessRate: 1,
      choicesExtractionRate: 1,
      answerMappingAccuracy: 1,
      autoApprovalErrors: 0,
      needsReviewRate: 0,
      verifiedCount: 0,
      needsReviewCount: 0,
      missingCount: 0,
    };
  }

  const actualMap = new Map<string, QuestionItem>();
  for (const q of actualQuestions) {
    if (q.questionNumber) {
      actualMap.set(q.questionNumber, q);
    }
  }

  let detectedNumberCount = 0;
  let completeStemCount = 0;
  let correctChoiceCount = 0;
  let correctMappedAnswerCount = 0;
  let totalWithAnswer = 0;
  let autoApprovalErrors = 0;

  for (const exp of expectedReferences) {
    const act = actualMap.get(exp.questionNumber);
    if (!act) continue;

    detectedNumberCount++;

    // 본문 키워드 포함 검사
    const hasAllKeywords = exp.expectedStemKeywords.every((kw) => act.stem.includes(kw));
    if (hasAllKeywords) completeStemCount++;

    // 선택지 개수 일치 검사
    if (act.choices.length === exp.expectedChoiceCount) {
      correctChoiceCount++;
    }

    // 정답 검사
    if (exp.expectedAnswerNumber !== undefined) {
      totalWithAnswer++;
      const targetChoice = act.choices[exp.expectedAnswerNumber - 1];

      if (act.answerStatus === 'verified') {
        if (!targetChoice || act.correctChoiceId !== targetChoice.id) {
          // 잘못된 정답이 verified로 자동 승인된 경우 치명적 결함! (지시서 65항)
          autoApprovalErrors++;
        } else {
          correctMappedAnswerCount++;
        }
      }
    }
  }

  let verifiedCount = 0;
  let needsReviewCount = 0;
  let missingCount = 0;

  for (const q of actualQuestions) {
    if (q.answerStatus === 'verified') verifiedCount++;
    else if (q.answerStatus === 'needs_review') needsReviewCount++;
    else if (q.answerStatus === 'missing') missingCount++;
  }

  return {
    totalQuestions: total,
    questionNumberRecall: detectedNumberCount / total,
    stemCompletenessRate: completeStemCount / total,
    choicesExtractionRate: correctChoiceCount / total,
    answerMappingAccuracy: totalWithAnswer > 0 ? correctMappedAnswerCount / totalWithAnswer : 1,
    autoApprovalErrors,
    needsReviewRate: actualQuestions.length > 0 ? needsReviewCount / actualQuestions.length : 0,
    verifiedCount,
    needsReviewCount,
    missingCount,
  };
}

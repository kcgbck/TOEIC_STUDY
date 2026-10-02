// 범용 문제 제작 및 학습 엔진 도메인 모델 (GEN-01 지시서 준수)
import type { ConfidenceLevel } from './ocr';

export type StudyBookKind = 'VOCABULARY' | 'MULTIPLE_CHOICE';

export type DocumentType = 'VOCABULARY' | 'MULTIPLE_CHOICE' | 'ANSWER_KEY' | 'UNKNOWN';

export interface DocumentClassification {
  type: DocumentType;
  confidence: number;
  reasons: string[];
}

export type AnswerEvidenceType =
  | 'INLINE_MARK'
  | 'ANSWER_KEY'
  | 'USER_CONFIRMED'
  | 'UNKNOWN';

export interface AnswerEvidence {
  type: AnswerEvidenceType;
  rawText?: string;
  sourcePage?: number;
  confidence: number;
}

export interface QuestionChoice {
  id: string; // 고유 ID (예: 'choice-1', 'c-abc-1')
  sourceLabel:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '①'
    | '②'
    | '③'
    | '④'
    | '⑤'
    | string;
  text: string;
}

export interface QuestionItem {
  id?: string;
  bookId: string;

  questionNumber?: string;

  stem: string;

  choiceCount: 4 | 5;

  choices: QuestionChoice[];

  // 중요: 정답을 correctIndex로 저장하지 않고 correctChoiceId로 저장!
  correctChoiceId?: string;

  answerStatus: 'verified' | 'needs_review' | 'missing';

  answerEvidence?: AnswerEvidence;

  explanation?: string;

  sourcePage?: number;

  sourceImageId?: string;

  sourceBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  questionConfidence: ConfidenceLevel;
  choicesConfidence: ConfidenceLevel;
  answerConfidence: ConfidenceLevel;

  isUserConfirmed: boolean;

  createdAt: string;
}

export interface QuestionBook {
  id?: string;
  title: string;
  sourceType: 'IMAGE' | 'PDF';
  questionType: 'MULTIPLE_CHOICE';
  questionCount: number;
  createdAt: string;
  lastStudiedAt?: string;
}

export interface QuestionStudyHistory {
  id?: string;
  questionId: string;
  bookId: string;
  isCorrect: boolean;
  selectedChoiceId?: string;
  studiedAt: string;
}

export interface QuestionStat {
  questionId: string;
  bookId: string;
  totalCount: number;
  correctCount: number;
  wrongCount: number;
  lastStudiedAt: string;
}

export interface SourceImage {
  id: string;
  bookId: string;
  page?: number;
  mimeType: string;
  dataUrl?: string;
  blob?: Blob;
  createdAt: string;
}

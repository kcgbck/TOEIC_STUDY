// 단어 및 학습 도메인 모델 정의

export type DifficultyLevel = 'low' | 'medium' | 'high' | 'auto';
export type LearningStatus = 'new' | 'learning' | 'weak' | 'review_needed' | 'familiar' | 'mastered';
export type SourceType = 'BUILTIN' | 'IMAGE' | 'PDF';

export interface WordEntry {
  id?: string;
  word: string;
  meaning: string[];
  partOfSpeech: string;
  difficulty: 'low' | 'medium' | 'high';
  topic: string;
  confusables?: string[];
  sourceBookId?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt?: string;
}

export interface WordBook {
  id?: string;
  title: string;
  sourceType: SourceType;
  sourceFileName?: string;
  wordCount: number;
  createdAt: string;
  lastStudiedAt?: string;
}

export interface StudyHistory {
  id?: string;
  wordId: string;
  isCorrect: boolean;
  selectedAnswer: string;
  studiedAt: string;
}

export interface WordStat {
  wordId: string;
  totalCount: number;
  correctCount: number;
  wrongCount: number;
  correctStreak: number;
  learningStatus: LearningStatus;
  lastStudiedAt: string;
}

export interface QuizQuestion {
  wordId: string;
  word: string;
  options: string[]; // 4지선다 보기
  correctIndex: number; // 0, 1, 2, 3
  difficulty: DifficultyLevel;
}

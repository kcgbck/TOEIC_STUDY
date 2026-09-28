export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface RecognizedTextBlock {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number; // 0.0 ~ 1.0 (또는 0 ~ 100)
  isKorean?: boolean;
  isEnglish?: boolean;
  side?: 'LEFT' | 'RIGHT' | 'SINGLE';
}

export interface ExtractedOcrWord {
  id: string;
  word: string;
  recommendedWord?: string; // 추천 후보 (자동 교정 금지, 지시서 8항)
  partOfSpeech?: string;
  meaning: string;
  additionalMeanings?: string[];
  exampleSentence?: string;
  exampleTranslation?: string;
  side?: 'LEFT' | 'RIGHT' | 'SINGLE';
  wordConfidence: ConfidenceLevel;
  meaningConfidence: ConfidenceLevel;
  pairConfidence: ConfidenceLevel;
  rawConfidence: number;
  isUserConfirmed?: boolean;
  isExcluded?: boolean;
}

export type OcrProgressCallback = (progress: { status: string; progress: number }) => void;

export interface OcrEngine {
  readonly name: string;
  init(onProgress?: OcrProgressCallback): Promise<void>;
  recognize(input: ImageData | Blob | HTMLCanvasElement | string): Promise<RecognizedTextBlock[]>;
  terminate(): Promise<void>;
}


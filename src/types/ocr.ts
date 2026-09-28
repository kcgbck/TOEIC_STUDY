// 브라우저 OCR 엔진 추상 인터페이스 정의 (지시서 42항 준수)

export interface RecognizedTextBlock {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number; // 0.0 ~ 1.0 (또는 0 ~ 100)
  isKorean?: boolean;
  isEnglish?: boolean;
}

export type OcrProgressCallback = (progress: { status: string; progress: number }) => void;

export interface OcrEngine {
  readonly name: string;
  init(onProgress?: OcrProgressCallback): Promise<void>;
  recognize(input: ImageData | Blob): Promise<RecognizedTextBlock[]>;
  terminate(): Promise<void>;
}

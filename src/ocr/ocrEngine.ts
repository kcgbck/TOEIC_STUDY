// 브라우저 OCR 엔진 인터페이스 및 후보군 어댑터 스켈레톤 (지시서 42항 준수)
import type { OcrEngine, RecognizedTextBlock, OcrProgressCallback } from '../types/ocr';

/**
 * 개발/테스트용 Mock OCR 엔진
 * 실제 OCR 모델 연동 전 파이프라인 무결성 및 인터페이스 검증에 사용
 */
export class MockOcrEngine implements OcrEngine {
  readonly name = 'MockOcrEngine (테스트 검증용)';
  private isInitialized = false;

  async init(onProgress?: OcrProgressCallback): Promise<void> {
    if (onProgress) {
      onProgress({ status: '가상 OCR 모델 로드 중...', progress: 0.5 });
      await new Promise((r) => setTimeout(r, 100));
      onProgress({ status: '로드 완료', progress: 1.0 });
    }
    this.isInitialized = true;
  }

  async recognize(_input: ImageData | Blob): Promise<RecognizedTextBlock[]> {
    if (!this.isInitialized) {
      throw new Error('OCR 엔진이 초기화되지 않았습니다.');
    }

    // 샘플 단어책 형태의 가상 인식 블록 반환
    return [
      { text: 'acquire', x: 50, y: 100, width: 120, height: 28, confidence: 0.95, isEnglish: true },
      { text: '획득하다, 습득하다', x: 200, y: 100, width: 220, height: 28, confidence: 0.92, isKorean: true },
      { text: 'confirm', x: 50, y: 150, width: 110, height: 28, confidence: 0.94, isEnglish: true },
      { text: '확인하다, 확정하다', x: 200, y: 150, width: 210, height: 28, confidence: 0.93, isKorean: true },
    ];
  }

  async terminate(): Promise<void> {
    this.isInitialized = false;
  }
}

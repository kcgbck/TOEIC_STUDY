// Tesseract.js 기반 브라우저 온디바이스 OCR 어댑터 (지시서 42항 준수)
import { createWorker, type Worker } from 'tesseract.js';
import type { OcrEngine, RecognizedTextBlock, OcrProgressCallback } from '../types/ocr';

export class TesseractOcrEngine implements OcrEngine {
  readonly name = 'Tesseract.js (온디바이스 WASM/WebWorker)';
  private worker: Worker | null = null;
  private isInitialized = false;

  async init(onProgress?: OcrProgressCallback): Promise<void> {
    if (this.isInitialized && this.worker) return;

    if (onProgress) {
      onProgress({ status: 'Tesseract OCR 엔진 준비 중...', progress: 0.1 });
    }

    this.worker = await createWorker(['eng', 'kor'], undefined, {
      logger: (m) => {
        if (onProgress && m.status && typeof m.progress === 'number') {
          onProgress({ status: m.status, progress: m.progress });
        }
      },
    });

    this.isInitialized = true;
    if (onProgress) {
      onProgress({ status: 'OCR 준비 완료', progress: 1.0 });
    }
  }

  async recognize(input: ImageData | Blob | HTMLCanvasElement | string): Promise<RecognizedTextBlock[]> {
    if (!this.worker || !this.isInitialized) {
      await this.init();
    }

    const ret = await this.worker!.recognize(input as any, {}, { blocks: true });
    const blocks: RecognizedTextBlock[] = [];
    const pageData = ret.data as any;

    if (pageData && Array.isArray(pageData.blocks)) {
      for (const b of pageData.blocks) {
        if (!b.paragraphs || !Array.isArray(b.paragraphs)) continue;
        for (const p of b.paragraphs) {
          if (!p.lines || !Array.isArray(p.lines)) continue;
          for (const line of p.lines) {
            const text = line.text?.trim() || '';
            if (!text) continue;
            const bbox = line.bbox || { x0: 0, y0: 0, x1: 0, y1: 0 };
            const x = bbox.x0;
            const y = bbox.y0;
            const width = bbox.x1 - bbox.x0;
            const height = bbox.y1 - bbox.y0;
            const confidence = typeof line.confidence === 'number' ? line.confidence / 100 : 0.8;

            const isEnglish = /^[a-zA-Z\s\-',.()]+$/.test(text);
            const isKorean = /[가-힣]/.test(text);

            blocks.push({
              text,
              x,
              y,
              width,
              height,
              confidence,
              isEnglish,
              isKorean,
            });
          }
        }
      }
    } else if (pageData && Array.isArray(pageData.lines)) {
      // 구버전 하위 호환
      for (const line of pageData.lines) {
        const text = line.text?.trim() || '';
        if (!text) continue;
        const bbox = line.bbox || { x0: 0, y0: 0, x1: 0, y1: 0 };
        const x = bbox.x0;
        const y = bbox.y0;
        const width = bbox.x1 - bbox.x0;
        const height = bbox.y1 - bbox.y0;
        const confidence = typeof line.confidence === 'number' ? line.confidence / 100 : 0.8;

        const isEnglish = /^[a-zA-Z\s\-',.()]+$/.test(text);
        const isKorean = /[가-힣]/.test(text);

        blocks.push({
          text,
          x,
          y,
          width,
          height,
          confidence,
          isEnglish,
          isKorean,
        });
      }
    }

    return blocks;

  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
    this.isInitialized = false;
  }
}

export const tesseractEngine = new TesseractOcrEngine();


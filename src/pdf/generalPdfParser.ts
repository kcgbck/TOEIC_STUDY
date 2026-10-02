// 범용 PDF 문제 파서 (전자 PDF 텍스트 레이어 + 스캔 PDF OCR 파이프라인) (지시서 35, 37, 38, 72항 준수)
import * as pdfjsLib from 'pdfjs-dist';
import type { RecognizedTextBlock, OcrEngine } from '../types/ocr';
import type { QuestionItem, DocumentClassification } from '../types/question';
import { classifyDocument } from '../ocr/documentClassifier';
import { extractQuestionsFromOcrBlocks } from '../ocr/multipleChoiceExtractor';
import { tesseractEngine } from '../ocr/tesseractOcrEngine';

export interface GeneralPdfExtractionResult {
  totalPages: number;
  hasTextLayer: boolean;
  classification: DocumentClassification;
  questions: QuestionItem[];
  totalBlocks: number;
}

/**
 * PDF 텍스트 항목을 좌표 기반 RecognizedTextBlock으로 변환
 */
export function convertPdfTextContentToBlocks(
  textContent: any,
  viewportHeight: number = 1000
): RecognizedTextBlock[] {
  if (!textContent || !textContent.items) return [];

  const blocks: RecognizedTextBlock[] = [];

  for (const item of textContent.items) {
    if (!('str' in item) || !item.str.trim()) continue;

    // PDF 좌표계: 좌하단이 (0,0) -> 웹 좌표계: 좌상단이 (0,0)으로 변환
    const x = Math.round(item.transform[4]);
    const rawY = Math.round(item.transform[5]);
    const y = Math.max(0, Math.round(viewportHeight - rawY));
    const width = Math.round(item.width || item.str.length * 12);
    const height = Math.round(item.height || 16);

    blocks.push({
      text: item.str.trim(),
      x,
      y,
      width,
      height,
      confidence: 0.95, // 전자 PDF 텍스트는 정확도 95% 이상
    });
  }

  return blocks;
}

/**
 * 범용 PDF 파일에서 객관식 문제 목록 자동 추출
 */
export async function extractGeneralQuestionsFromPdf(
  fileData: ArrayBuffer,
  options: {
    bookId?: string;
    ocrEngine?: OcrEngine;
    onProgress?: (page: number, total: number) => void;
  } = {}
): Promise<GeneralPdfExtractionResult> {
  const loadingTask = pdfjsLib.getDocument({ data: fileData });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;
  const bookId = options.bookId || 'imported-pdf';

  let hasTextLayer = false;
  const allBlocks: RecognizedTextBlock[] = [];

  for (let p = 1; p <= totalPages; p++) {
    options.onProgress?.(p, totalPages);
    const page = await pdfDoc.getPage(p);
    const viewport = page.getViewport({ scale: 1.5 });
    const textContent = await page.getTextContent();

    const pageBlocks = convertPdfTextContentToBlocks(textContent, viewport.height);

    if (pageBlocks.length > 0) {
      hasTextLayer = true;
      allBlocks.push(...pageBlocks);
    } else {
      // 텍스트 레이어가 없는 스캔 PDF인 경우 Canvas 렌더링 후 OCR 수행 (지시서 38항)
      if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          await (page as any).render({ canvasContext: ctx, viewport }).promise;
          const engine = options.ocrEngine || tesseractEngine;
          await engine.init();
          const ocrBlocks = await engine.recognize(canvas);
          allBlocks.push(...ocrBlocks);
        }
      }
    }
  }

  // 1. 문서 유형 분류
  const classification = classifyDocument(allBlocks);

  // 2. 객관식 문제 구조화 추출
  const extractionResult = extractQuestionsFromOcrBlocks(allBlocks, bookId);

  return {
    totalPages,
    hasTextLayer,
    classification,
    questions: extractionResult.questions,
    totalBlocks: allBlocks.length,
  };
}

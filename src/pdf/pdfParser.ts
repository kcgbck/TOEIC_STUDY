// PDF.js 기반 브라우저 PDF 파서 및 어휘 추출 모듈 (지시서 20~22항, 41항 준수)
import * as pdfjsLib from 'pdfjs-dist';

// Vite 환경에서 PDF.js Worker 번들 경로 설정
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export interface PdfPocResult {
  totalPages: number;
  hasTextLayer: boolean;
  firstPageTextSample: string;
  renderCanvasSuccess: boolean;
}

export interface ExtractedVocabularyItem {
  id: string;
  wordNumber?: number;
  word: string;
  partOfSpeech?: string;
  meaning: string;
  page: number;
}

export interface ExtractedVocabularyResult {
  totalPages: number;
  extractedWords: ExtractedVocabularyItem[];
  successCount: number;
  hasTextLayer: boolean;
}

/**
 * 1개 라인 아이템들에서 단어번호, 영어단어, 뜻을 분리
 */
export function parseLineItems(items: Array<{ str: string; x: number; y: number }>): {
  num?: number;
  word: string;
  partOfSpeech?: string;
  meaning: string;
} | null {
  if (items.length === 0) return null;

  // 1. 단어 번호 (x <= 80)
  const indexItem = items.find((it) => it.x <= 80 && /^\d{1,4}$/.test(it.str));
  const num = indexItem ? parseInt(indexItem.str, 10) : undefined;

  // 2. 영어 표제어 (80 < x < 280 중 가장 왼쪽에 위치한 표제어 선택, 지시서 36항 준수)
  const englishItems = items
    .filter((it) => it.x > 80 && it.x < 280 && /^[a-zA-Z\s\-']{2,40}$/.test(it.str))
    .sort((a, b) => a.x - b.x);
  if (englishItems.length === 0) return null;

  const word = englishItems[0].str.trim();

  // 3. 한국어 뜻 및 품사 (x >= 320)
  const meaningItems = items.filter((it) => it.x >= 320 && !/^\d{1,4}$/.test(it.str));
  if (meaningItems.length === 0) return null;

  const posRegex = /^(\((동|명|형|부|전|접|대)\)|v\.|n\.|adj\.|adv\.)/i;
  let partOfSpeech: string | undefined = undefined;

  // 고유 의미 구문 순서 유지
  const uniquePhrases: string[] = [];
  for (const m of meaningItems) {
    if (posRegex.test(m.str) && !partOfSpeech) {
      partOfSpeech = m.str;
    }
    if (!uniquePhrases.includes(m.str)) {
      uniquePhrases.push(m.str);
    }
  }

  const cleanedMeaning = uniquePhrases.join(' ').trim();
  if (!word || !cleanedMeaning) return null;

  return {
    num,
    word,
    partOfSpeech,
    meaning: cleanedMeaning,
  };
}

/**
 * PDF 문서에서 전체 어휘 목록 자동 추출
 */
export async function extractVocabularyFromPdf(
  fileData: ArrayBuffer,
  onProgress?: (current: number, total: number) => void
): Promise<ExtractedVocabularyResult> {
  const loadingTask = pdfjsLib.getDocument({ data: fileData });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  const extractedWords: ExtractedVocabularyItem[] = [];
  let totalTextItems = 0;

  for (let p = 1; p <= totalPages; p++) {
    if (onProgress) {
      onProgress(p, totalPages);
    }

    const page = await pdfDoc.getPage(p);
    const textContent = await page.getTextContent();
    totalTextItems += textContent.items.length;

    // Y 좌표 기준 행 클러스터링 (+- 3.5px 오차 허용)
    const rowMap = new Map<number, Array<{ str: string; x: number; y: number }>>();

    for (const item of textContent.items) {
      if (!('str' in item) || !item.str.trim()) continue;
      const x = Math.round(item.transform[4]);
      const y = Math.round(item.transform[5]);

      let matchedY: number | null = null;
      for (const existingY of rowMap.keys()) {
        if (Math.abs(existingY - y) <= 3.5) {
          matchedY = existingY;
          break;
        }
      }

      if (matchedY === null) {
        matchedY = y;
        rowMap.set(matchedY, []);
      }
      rowMap.get(matchedY)!.push({ str: item.str.trim(), x, y });
    }

    // Y좌표 내림차순 정렬 (상단 -> 하단)
    const sortedYs = Array.from(rowMap.keys()).sort((a, b) => b - a);

    for (const y of sortedYs) {
      const items = rowMap.get(y)!;
      // X좌표 오름차순 정렬
      items.sort((a, b) => a.x - b.x);

      const parsed = parseLineItems(items);
      if (parsed) {
        extractedWords.push({
          id: `pdf_p${p}_w${extractedWords.length + 1}_${Date.now()}`,
          wordNumber: parsed.num,
          word: parsed.word,
          partOfSpeech: parsed.partOfSpeech,
          meaning: parsed.meaning,
          page: p,
        });
      }
    }
  }

  const hasTextLayer = totalTextItems > 20;

  return {
    totalPages,
    extractedWords,
    successCount: extractedWords.length,
    hasTextLayer,
  };
}

/**
 * PDF 파일을 메모리에서 파싱하여 텍스트 레이어 및 페이지 수 검증 (기존 POC 호환)
 */
export async function inspectPdfDocument(
  fileData: ArrayBuffer,
  canvasTarget?: HTMLCanvasElement
): Promise<PdfPocResult> {
  const loadingTask = pdfjsLib.getDocument({ data: fileData });
  const pdfDoc = await loadingTask.promise;

  const totalPages = pdfDoc.numPages;
  if (totalPages === 0) {
    throw new Error('PDF에 페이지가 없습니다.');
  }

  const firstPage = await pdfDoc.getPage(1);
  const textContent = await firstPage.getTextContent();

  const extractedStrings: string[] = [];
  for (const item of textContent.items) {
    if ('str' in item && typeof item.str === 'string') {
      const trimmed = item.str.trim();
      if (trimmed) extractedStrings.push(trimmed);
    }
  }

  const hasTextLayer = extractedStrings.length > 5;
  const firstPageTextSample = extractedStrings.slice(0, 15).join(' ');

  let renderCanvasSuccess = false;
  if (canvasTarget) {
    try {
      const viewport = firstPage.getViewport({ scale: 1.0 });
      canvasTarget.width = viewport.width;
      canvasTarget.height = viewport.height;
      const context = canvasTarget.getContext('2d');

      if (context) {
        await firstPage.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        renderCanvasSuccess = true;
      }
    } catch (err) {
      console.warn('[PDF.js] Canvas render failed:', err);
    }
  } else {
    renderCanvasSuccess = true;
  }

  return {
    totalPages,
    hasTextLayer,
    firstPageTextSample: firstPageTextSample || '(추출된 텍스트 없음 - 스캔형 PDF 추정)',
    renderCanvasSuccess,
  };
}

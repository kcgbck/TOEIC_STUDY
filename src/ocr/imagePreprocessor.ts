// 브라우저 Canvas 기반 이미지 전처리 모듈 (지시서 Section 16 준수)

export type SpreadLayoutType = 'single' | 'spread' | 'uncertain';

export interface PreprocessOptions {
  enableSplit?: boolean;
  minWidthForUpscale?: number;
  contrastBoost?: boolean;
}

export interface SplitResult {
  canvases: HTMLCanvasElement[];
  isSplit: boolean;
  layoutType: SpreadLayoutType;
  splitReason: string;
}

/**
 * 이미지 종횡비를 정밀 분석하여 펼침면 레이아웃 감지 (지시서 16항)
 */
export function detectSpreadLayout(width: number, height: number): SpreadLayoutType {
  if (height <= 0 || width <= 0) return 'uncertain';
  const aspectRatio = width / height;

  // 1. 세로형 또는 정방형은 명확한 단일 페이지
  if (aspectRatio < 1.15) {
    return 'single';
  }

  // 2. 가로세로 비가 1.45 이상이면 명확한 2페이지 펼침면(또는 2단)
  if (aspectRatio >= 1.45) {
    return 'spread';
  }

  // 3. 1.15 ~ 1.45 구간은 4:3 풍경 사진 등 모호한 구간
  return 'uncertain';
}

/**
 * 2페이지 펼침면 또는 2단 레이아웃 감지 및 안전 분할 (지시서 16항 안전장치)
 */
export function detectAndSplitImage(
  sourceCanvas: HTMLCanvasElement,
  options: PreprocessOptions = {}
): SplitResult {
  const { width, height } = sourceCanvas;
  const layoutType = detectSpreadLayout(width, height);
  const aspectRatio = width / height;

  // spread로 명확히 판별된 경우에만 2면 분할 수행 (uncertain인 경우 억지 분할 금지)
  if (options.enableSplit !== false && layoutType === 'spread') {
    const leftWidth = Math.round(width * 0.52);
    const rightStart = Math.round(width * 0.48);
    const rightWidth = width - rightStart;

    // 1. 좌측 페이지 캔버스
    const leftCanvas = document.createElement('canvas');
    leftCanvas.width = leftWidth;
    leftCanvas.height = height;
    const leftCtx = leftCanvas.getContext('2d');
    if (leftCtx) {
      leftCtx.drawImage(sourceCanvas, 0, 0, leftWidth, height, 0, 0, leftWidth, height);
    }

    // 2. 우측 페이지 캔버스
    const rightCanvas = document.createElement('canvas');
    rightCanvas.width = rightWidth;
    rightCanvas.height = height;
    const rightCtx = rightCanvas.getContext('2d');
    if (rightCtx) {
      rightCtx.drawImage(sourceCanvas, rightStart, 0, rightWidth, height, 0, 0, rightWidth, height);
    }

    return {
      canvases: [leftCanvas, rightCanvas],
      isSplit: true,
      layoutType: 'spread',
      splitReason: `2면 펼침면 감지(종횡비 ${aspectRatio.toFixed(2)}): 좌/우 2면 분할 적용`,
    };
  }

  if (layoutType === 'uncertain') {
    return {
      canvases: [sourceCanvas],
      isSplit: false,
      layoutType: 'uncertain',
      splitReason: `종횡비(${aspectRatio.toFixed(2)}) 모호: 오분할 방지를 위해 단일 페이지로 유지`,
    };
  }

  return {
    canvases: [sourceCanvas],
    isSplit: false,
    layoutType: 'single',
    splitReason: `단일 페이지 레이아웃(종횡비 ${aspectRatio.toFixed(2)}) 감지`,
  };
}

/**
 * 저해상도 이미지 2배 업스케일링 및 그레이스케일/대비 정규화
 */
export function enhanceCanvasForOcr(
  canvas: HTMLCanvasElement,
  options: PreprocessOptions = {}
): HTMLCanvasElement {
  const minWidth = options.minWidthForUpscale ?? 1200;
  const scale = canvas.width < minWidth ? 2 : 1;

  const targetCanvas = document.createElement('canvas');
  targetCanvas.width = canvas.width * scale;
  targetCanvas.height = canvas.height * scale;
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(canvas, 0, 0, targetCanvas.width, targetCanvas.height);

  if (options.contrastBoost === false) {
    return targetCanvas;
  }

  const imgData = ctx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
  const data = imgData.data;

  let minVal = 255;
  let maxVal = 0;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (gray < minVal) minVal = gray;
    if (gray > maxVal) maxVal = gray;
  }

  const range = maxVal - minVal;
  const shouldStretch = range > 30;

  for (let i = 0; i < data.length; i += 4) {
    let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (shouldStretch) {
      gray = ((gray - minVal) / range) * 255;
    }
    gray = gray < 128 ? gray * 0.9 : Math.min(255, gray * 1.1);

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  ctx.putImageData(imgData, 0, 0);
  return targetCanvas;
}

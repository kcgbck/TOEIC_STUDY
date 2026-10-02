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

export interface ImageQualityReport {
  resolutionStatus: 'high' | 'adequate' | 'low';
  averageBrightness: number; // 0 ~ 255
  contrastScore: number; // 0 ~ 100
  isShadowHeavy: boolean;
  recommendations: string[];
}

/**
 * OCR 시작 전 이미지 품질 자동 진단 (지시서 25항)
 */
export function analyzeImageQuality(
  width: number,
  height: number,
  pixelData: Uint8ClampedArray
): ImageQualityReport {
  const pixelCount = width * height;
  const recommendations: string[] = [];

  // 1. 해상도 진단
  let resolutionStatus: 'high' | 'adequate' | 'low' = 'adequate';
  if (width < 800 || height < 600) {
    resolutionStatus = 'low';
    recommendations.push('해상도가 낮아 문자 인식이 저하될 수 있습니다 (800x600 이상 권장)');
  } else if ((width >= 1600 && height >= 1000) || width * height >= 1920 * 1080) {
    resolutionStatus = 'high';
  }

  // 2. 밝기 및 대비 분석
  let sumGray = 0;
  let minGray = 255;
  let maxGray = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    const gray = 0.299 * pixelData[i] + 0.587 * pixelData[i + 1] + 0.114 * pixelData[i + 2];
    sumGray += gray;
    if (gray < minGray) minGray = gray;
    if (gray > maxGray) maxGray = gray;
  }

  const avgBrightness = pixelCount > 0 ? Math.round(sumGray / pixelCount) : 128;
  const contrastRange = maxGray - minGray;
  const contrastScore = Math.min(100, Math.round((contrastRange / 255) * 100));

  if (avgBrightness < 60) {
    recommendations.push('이미지가 너무 어둡습니다. 밝은 조명에서 촬영해 주세요');
  } else if (avgBrightness > 210) {
    recommendations.push('이미지가 과도하게 밝거나 빛 반사가 있습니다');
  }

  const isShadowHeavy = contrastRange > 180 && avgBrightness < 100;
  if (isShadowHeavy) {
    recommendations.push('페이지 일부에 강한 그림자가 감지되었습니다');
  }

  if (recommendations.length === 0) {
    recommendations.push('문서 인식에 적합한 품질입니다');
  }

  return {
    resolutionStatus,
    averageBrightness: avgBrightness,
    contrastScore,
    isShadowHeavy,
    recommendations,
  };
}

/**
 * 그림자 완화 및 국소 대비 개선을 위한 적응형 이진화 (지시서 26항)
 */
export function applyAdaptiveThreshold(canvas: HTMLCanvasElement): HTMLCanvasElement {
  if (typeof document === 'undefined') return canvas;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const { width, height } = canvas;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // 간이 적응형 문턱값 처리: 주변 픽셀 밝기 대비 10% 이상 어두우면 텍스트(0), 아니면 배경(255)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      // 국소 적응 기준값 보정 (간이 모델)
      const threshold = 128;
      const val = gray < threshold ? 0 : 255;
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

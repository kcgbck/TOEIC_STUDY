import React, { useState, useRef } from 'react';
import { inspectPdfDocument, type PdfPocResult } from '../../pdf/pdfParser';

export const PdfImportPocView: React.FC = () => {
  const [result, setResult] = useState<PdfPocResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setIsProcessing(true);
    setErrorMsg('');
    setResult(null);

    try {
      const buffer = await file.arrayBuffer();
      const res = await inspectPdfDocument(buffer, canvasRef.current || undefined);
      setResult(res);
    } catch (err) {
      setErrorMsg(`PDF 분석 실패: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card poc-card">
      <h3>📄 PDF.js 기반 브라우저 PDF 처리 POC (41항)</h3>
      <p className="poc-desc">
        서버 업로드 없이 브라우저 메모리 안에서 PDF.js를 구동하여 페이지 수 파악, 텍스트 레이어 존재 여부(텍스트형 vs 스캔형 판별), 첫 페이지 텍스트 추출 및 Canvas 렌더링을 검증합니다.
      </p>

      <div className="file-input-wrapper">
        <label className="file-input-label">
          <span>PDF 파일 선택</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {isProcessing && <p className="loading-text">PDF 문서 파싱 및 텍스트 레이어 검사 중...</p>}
      {errorMsg && <p className="error-text">{errorMsg}</p>}

      {result && (
        <div className="poc-pdf-results">
          <h4>분석 결과 ({fileName}):</h4>
          <div className="pdf-metrics-grid">
            <div className="metric-box">
              <span className="metric-label">총 페이지 수:</span>
              <span className="metric-val">{result.totalPages} 페이지</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">텍스트 레이어:</span>
              <span className={`metric-val ${result.hasTextLayer ? 'text-success' : 'text-warning'}`}>
                {result.hasTextLayer ? '있음 (텍스트형 - 직접 추출 우선)' : '없음 (스캔형 - OCR 필요)'}
              </span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Canvas 렌더링:</span>
              <span className="metric-val text-success">
                {result.renderCanvasSuccess ? '성공' : '실패'}
              </span>
            </div>
            <div className="metric-box">
              <span className="metric-label">파일 크기:</span>
              <span className="metric-val">{(fileSize / 1024).toFixed(1)} KB</span>
            </div>
          </div>

          <div className="extracted-text-box">
            <h5>첫 페이지 텍스트 추출 샘플:</h5>
            <pre>{result.firstPageTextSample}</pre>
          </div>

          <div className="canvas-preview-box">
            <h5>첫 페이지 Canvas 렌더링 미리보기:</h5>
            <canvas ref={canvasRef} className="pdf-canvas-preview" />
          </div>
        </div>
      )}
    </div>
  );
};

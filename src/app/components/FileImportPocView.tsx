import React, { useState, useRef } from 'react';
import { detectAndSplitImage, enhanceCanvasForOcr } from '../../ocr/imagePreprocessor';
import { TesseractOcrEngine } from '../../ocr/tesseractOcrEngine';
import { extractVocabularyFromOcrBlocks, type ExtractedOcrWord } from '../../ocr/vocabularyExtractor';
import { db } from '../../storage/db';

interface Props {
  onStartQuizWithWords?: (words: Array<{ word: string; meaning: string[] }>) => void;
}

export const FileImportPocView: React.FC<Props> = ({ onStartQuizWithWords }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [splitInfo, setSplitInfo] = useState<string>('');
  const [extractedWords, setExtractedWords] = useState<ExtractedOcrWord[]>([]);
  const [savedBookTitle, setSavedBookTitle] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const hiddenImgRef = useRef<HTMLImageElement | null>(null);

  // 이미지 URL 또는 Blob으로부터 전처리 및 OCR 파이프라인 가동
  const processImage = async (url: string, name: string) => {
    setImageSrc(url);
    setFileName(name);
    setIsProcessing(true);
    setProgressPercent(5);
    setProgressText('이미지 로드 및 종횡비 분석 중...');
    setErrorMsg('');
    setSavedBookTitle('');
    setExtractedWords([]);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('이미지를 읽을 수 없습니다.'));
      });

      // 1. 소스 Canvas에 드로우
      const sourceCanvas = document.createElement('canvas');
      sourceCanvas.width = img.naturalWidth;
      sourceCanvas.height = img.naturalHeight;
      const ctx = sourceCanvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D 컨텍스트 생성 실패');
      ctx.drawImage(img, 0, 0);

      // 2. 2면 분할 감지
      setProgressPercent(15);
      setProgressText('2단/2면 펼침면 감지 및 분할 전처리 중...');
      const splitResult = detectAndSplitImage(sourceCanvas);
      setSplitInfo(splitResult.splitReason);

      // 3. 각 분할 면에 대해 2배 업스케일링 및 대비 향상
      const processedCanvases = splitResult.canvases.map((c) =>
        enhanceCanvasForOcr(c, { minWidthForUpscale: 1200, contrastBoost: true })
      );

      // 4. Tesseract OCR 엔진 초기화 및 인식
      setProgressPercent(25);
      setProgressText('온디바이스 Tesseract OCR 엔진 준비 중...');

      const engine = new TesseractOcrEngine();
      await engine.init((p) => {
        const mapped = Math.round(25 + p.progress * 60);
        setProgressPercent(mapped);
        setProgressText(`단어책 텍스트 및 바운딩 박스 인식 중... (${p.status})`);
      });

      const allBlocks = [];
      for (let i = 0; i < processedCanvases.length; i++) {
        setProgressText(`페이지 ${i + 1}/${processedCanvases.length} 인식 처리 중...`);
        const blocks = await engine.recognize(processedCanvases[i]);
        allBlocks.push(...blocks);
      }

      await engine.terminate();

      // 5. 어휘 연결 및 표제어/뜻 추출
      setProgressPercent(95);
      setProgressText('표제어, 품사, 한국어 뜻 기하학적 매핑 중...');
      const parsedWords = extractVocabularyFromOcrBlocks(allBlocks);

      if (parsedWords.length === 0) {
        setErrorMsg('인식된 텍스트 중 적격한 토익 표제어를 찾지 못했습니다. 사진을 더 밝고 선명하게 촬영해 주세요.');
      } else {
        setExtractedWords(parsedWords);
        setProgressText(`OCR 인식 완료: ${parsedWords.length}개 어휘 추출 성공`);
      }
      setProgressPercent(100);
    } catch (err) {
      setErrorMsg(`OCR 처리 중 오류: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    processImage(url, file.name);
  };

  const handleDeleteWord = (id: string) => {
    setExtractedWords((prev) => prev.filter((w) => w.id !== id));
  };

  const handleMeaningChange = (id: string, newMeaning: string) => {
    setExtractedWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, meaning: newMeaning } : w))
    );
  };

  // IndexedDB 문제집 저장
  const handleSaveToWordBook = async () => {
    if (extractedWords.length === 0) return;

    try {
      const bookTitle = `${fileName.replace(/\.[a-z]+$/i, '')} 문제집 (${extractedWords.length}단어)`;
      const now = new Date().toISOString();

      const bookId = await db.wordBooks.add({
        title: bookTitle,
        sourceType: 'IMAGE',
        sourceFileName: fileName,
        wordCount: extractedWords.length,
        createdAt: now,
      });

      const wordEntries = extractedWords.map((w) => ({
        word: w.word,
        meaning: [w.meaning],
        partOfSpeech: w.partOfSpeech || '단어',
        difficulty: 'medium' as const,
        topic: 'toeic',
        sourceBookId: String(bookId),
        confidence: 'HIGH' as const,
        createdAt: now,
      }));

      await db.words.bulkAdd(wordEntries);
      setSavedBookTitle(bookTitle);

      if (onStartQuizWithWords) {
        onStartQuizWithWords(wordEntries.map((e) => ({ word: e.word, meaning: e.meaning })));
      }
    } catch (err) {
      setErrorMsg(`문제집 저장 실패: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="card poc-card">
      <div className="section-header">
        <h3>📷 사진으로 문제 만들기 (온디바이스 OCR 분석)</h3>
        <span className="badge badge-accent">온디바이스 Tesseract WASM</span>
      </div>

      <p className="poc-desc">
        휴대폰으로 촬영한 단어책 사진을 100% 브라우저 안에서 자동 2면 분할, 2배 업스케일 및 대비를 강화한 후 Tesseract.js로 영단어와 뜻을 추출합니다. (서버 전송 0)
      </p>

      <div className="action-buttons-row">
        <label className="btn btn-primary file-input-label">
          <span>📸 사진 선택 또는 카메라 촬영</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {isProcessing && (
        <div className="progress-container">
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="loading-text">{progressText} ({progressPercent}%)</p>
        </div>
      )}

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      {savedBookTitle && (
        <div className="success-banner">
          🎉 <strong>{savedBookTitle}</strong>이(가) 내 문제집(IndexedDB)에 저장되었습니다!
        </div>
      )}

      {imageSrc && (
        <div className="image-preview-panel">
          <div className="preview-header">
            <h4>입력 이미지: {fileName}</h4>
            {splitInfo && <span className="split-badge">{splitInfo}</span>}
          </div>
          <div className="img-container">
            <img src={imageSrc} alt="미리보기" className="source-img-preview" />
          </div>
        </div>
      )}

      {extractedWords.length > 0 && (
        <div className="extracted-section">
          <div className="extracted-header">
            <h4>추출된 단어 목록 ({extractedWords.length}개)</h4>
            <button className="btn btn-accent" onClick={handleSaveToWordBook}>
              💾 이 단어들로 문제집 저장하기
            </button>
          </div>

          <div className="table-responsive">
            <table className="words-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>번호</th>
                  <th style={{ width: '140px' }}>표제어</th>
                  <th style={{ width: '80px' }}>품사</th>
                  <th>한국어 뜻 (직접 수정 가능)</th>
                  <th style={{ width: '60px' }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {extractedWords.map((w, idx) => (
                  <tr key={w.id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="word-cell">
                      <strong>{w.word}</strong>
                    </td>
                    <td>
                      <span className="pos-tag">{w.partOfSpeech || '-'}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="meaning-edit-input"
                        value={w.meaning}
                        onChange={(e) => handleMeaningChange(w.id, e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn-text-danger"
                        onClick={() => handleDeleteWord(w.id)}
                        title="단어 제거"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <img ref={hiddenImgRef} style={{ display: 'none' }} alt="" />
    </div>
  );
};

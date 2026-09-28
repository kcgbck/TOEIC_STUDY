import React, { useState, useRef } from 'react';
import { detectAndSplitImage, enhanceCanvasForOcr } from '../../ocr/imagePreprocessor';
import { TesseractOcrEngine } from '../../ocr/tesseractOcrEngine';
import { extractVocabularyFromOcrBlocks, type ExtractedOcrWord } from '../../ocr/vocabularyExtractor';
import { db } from '../../storage/db';

interface Props {
  onStartQuizWithWords?: (words: Array<{ word: string; meaning: string[] }>) => void;
}

type FilterMode = 'all' | 'suspect' | 'needs_check';

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
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

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

  const handleWordFieldChange = (id: string, field: keyof ExtractedOcrWord, value: any) => {
    setExtractedWords((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, [field]: value, isUserConfirmed: true };
        }
        return w;
      })
    );
  };

  const handleToggleExclude = (id: string) => {
    setExtractedWords((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextExcluded = !w.isExcluded;
          return { ...w, isExcluded: nextExcluded, isUserConfirmed: true };
        }
        return w;
      })
    );
  };

  const handleApplyRecommendation = (id: string, recommended: string) => {
    setExtractedWords((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, word: recommended, isUserConfirmed: true, wordConfidence: 'high' };
        }
        return w;
      })
    );
  };

  // 필터링된 단어 목록 (지시서 14항)
  const filteredWords = extractedWords.filter((w) => {
    if (filterMode === 'suspect') {
      return w.pairConfidence === 'low' || w.isExcluded;
    }
    if (filterMode === 'needs_check') {
      return w.pairConfidence === 'medium';
    }
    return true;
  });

  // IndexedDB 문제집 저장 (지시서 15항 핵심 관문)
  const handleSaveToWordBook = async () => {
    // 관문: word != empty && meaning != empty && isExcluded != true && (pairConfidence != low || isUserConfirmed)
    const eligibleWords = extractedWords.filter(
      (w) =>
        w.word.trim().length > 0 &&
        w.meaning.trim().length > 0 &&
        !w.isExcluded &&
        (w.pairConfidence !== 'low' || w.isUserConfirmed)
    );

    if (eligibleWords.length === 0) {
      setErrorMsg('저장 가능한 검증 완료 단어가 없습니다. 제외 항목을 해제하거나 직접 수정 후 저장해 주세요.');
      return;
    }

    try {
      const bookTitle = `${fileName.replace(/\.[a-z]+$/i, '')} 문제집 (${eligibleWords.length}단어)`;
      const now = new Date().toISOString();

      const bookId = await db.wordBooks.add({
        title: bookTitle,
        sourceType: 'IMAGE',
        sourceFileName: fileName,
        wordCount: eligibleWords.length,
        createdAt: now,
      });

      const wordEntries = eligibleWords.map((w) => ({
        word: w.word,
        meaning: [w.meaning, ...(w.additionalMeanings || [])],
        partOfSpeech: w.partOfSpeech || '단어',
        difficulty: 'medium' as const,
        topic: 'toeic',
        sourceBookId: String(bookId),
        confidence: (w.pairConfidence.toUpperCase() as any) || 'HIGH',
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
          <div className="extracted-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h4>추출된 단어 검토 및 확정 ({extractedWords.length}개)</h4>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                안전 관문: 낮은 신뢰도 항목은 자동 제외 처리되며, 사용자 직접 검토/수정 시에만 문제집에 저장됩니다.
              </p>
            </div>
            <button className="btn btn-accent" onClick={handleSaveToWordBook}>
              💾 승인된 단어로 문제집 저장 ({extractedWords.filter((w) => !w.isExcluded).length}개)
            </button>
          </div>

          {/* 지시서 14항 필터 버튼 그룹 */}
          <div style={{ display: 'flex', gap: '8px', margin: '12px 0' }}>
            <button
              className={`btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode('all')}
            >
              전체 ({extractedWords.length})
            </button>
            <button
              className={`btn btn-sm ${filterMode === 'suspect' ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => setFilterMode('suspect')}
            >
              오류 의심 / 제외 ({extractedWords.filter((w) => w.pairConfidence === 'low' || w.isExcluded).length})
            </button>
            <button
              className={`btn btn-sm ${filterMode === 'needs_check' ? 'btn-warning' : 'btn-secondary'}`}
              onClick={() => setFilterMode('needs_check')}
            >
              확인 필요 ({extractedWords.filter((w) => w.pairConfidence === 'medium').length})
            </button>
          </div>

          <div className="table-responsive">
            <table className="words-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>포함</th>
                  <th style={{ width: '130px' }}>표제어</th>
                  <th style={{ width: '80px' }}>품사</th>
                  <th>대표 뜻</th>
                  <th style={{ width: '100px' }}>추가 뜻</th>
                  <th style={{ width: '90px' }}>신뢰도</th>
                  <th style={{ width: '50px' }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((w) => {
                  const confBadgeClass =
                    w.pairConfidence === 'high'
                      ? 'badge-success'
                      : w.pairConfidence === 'medium'
                      ? 'badge-warning'
                      : 'badge-danger';

                  return (
                    <tr key={w.id} style={{ opacity: w.isExcluded ? 0.6 : 1.0 }}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={!w.isExcluded}
                          onChange={() => handleToggleExclude(w.id)}
                          title={w.isExcluded ? '문제집에 포함' : '문제집에서 제외'}
                        />
                      </td>
                      <td className="word-cell">
                        <input
                          type="text"
                          className="word-edit-input"
                          style={{ width: '100%', fontWeight: 'bold' }}
                          value={w.word}
                          onChange={(e) => handleWordFieldChange(w.id, 'word', e.target.value)}
                        />
                        {w.recommendedWord && w.recommendedWord !== w.word && (
                          <div style={{ fontSize: '11px', marginTop: '2px' }}>
                            <span style={{ color: '#38bdf8' }}>추천: {w.recommendedWord}</span>
                            <button
                              type="button"
                              style={{ marginLeft: '4px', fontSize: '10px', padding: '1px 4px', cursor: 'pointer' }}
                              onClick={() => handleApplyRecommendation(w.id, w.recommendedWord!)}
                            >
                              적용
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: '100%', fontSize: '12px' }}
                          value={w.partOfSpeech || ''}
                          placeholder="품사"
                          onChange={(e) => handleWordFieldChange(w.id, 'partOfSpeech', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="meaning-edit-input"
                          value={w.meaning}
                          onChange={(e) => handleWordFieldChange(w.id, 'meaning', e.target.value)}
                        />
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                          {w.additionalMeanings?.length ? w.additionalMeanings.join(', ') : '-'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${confBadgeClass}`} style={{ fontSize: '11px' }}>
                          {w.pairConfidence.toUpperCase()}
                        </span>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <img ref={hiddenImgRef} style={{ display: 'none' }} alt="" />
    </div>
  );
};

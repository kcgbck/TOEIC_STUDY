import React, { useState, useRef } from 'react';
import { extractVocabularyFromPdf, type ExtractedVocabularyItem } from '../../pdf/pdfParser';
import { db } from '../../storage/db';

interface Props {
  onStartQuizWithWords?: (words: Array<{ word: string; meaning: string[] }>) => void;
}

export const PdfImportPocView: React.FC<Props> = ({ onStartQuizWithWords }) => {
  const [words, setWords] = useState<ExtractedVocabularyItem[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [savedBookTitle, setSavedBookTitle] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processBuffer = async (buffer: ArrayBuffer, name: string, size: number) => {
    setFileName(name);
    setFileSize(size);
    setIsProcessing(true);
    setErrorMsg('');
    setSavedBookTitle('');
    setWords([]);

    try {
      const res = await extractVocabularyFromPdf(buffer, (current, total) => {
        setProgressText(`PDF 페이지 분석 중... (${current}/${total} 페이지)`);
      });

      if (!res.hasTextLayer) {
        setErrorMsg('이 PDF는 텍스트 레이어가 없는 스캔 이미지형 문서입니다. 사진/이미지 OCR 메뉴를 이용해 주세요.');
        return;
      }

      setWords(res.extractedWords);
      setProgressText(`추출 완료: 총 ${res.successCount}개 토익 어휘가 준비되었습니다.`);
    } catch (err) {
      setErrorMsg(`PDF 분석 실패: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    await processBuffer(buffer, file.name, file.size);
  };

  // 단어 삭제
  const handleDeleteWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

  // 단어 뜻 수정
  const handleMeaningChange = (id: string, newMeaning: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, meaning: newMeaning } : w))
    );
  };

  // IndexedDB 문제집 저장
  const handleSaveToWordBook = async () => {
    if (words.length === 0) return;

    try {
      const bookTitle = `${fileName.replace(/\.pdf$/i, '')} 문제집 (${words.length}단어)`;
      const now = new Date().toISOString();

      const bookId = await db.wordBooks.add({
        title: bookTitle,
        sourceType: 'PDF',
        sourceFileName: fileName,
        wordCount: words.length,
        createdAt: now,
      });

      const wordEntries = words.map((w) => ({
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
        <h3>📄 PDF로 문제 만들기 (전자문서 텍스트 직접 추출)</h3>
        <span className="badge badge-success">텍스트 레이어 파싱</span>
      </div>

      <p className="poc-desc">
        서버 전송 없이 100% 브라우저 메모리에서 PDF.js로 전자문서의 텍스트 레이어를 분석하여 토익 표제어와 한글 뜻을 추출합니다. (스캔 이미지는 사진 메뉴 이용 권장)
      </p>

      <div className="action-buttons-row">
        <label className="btn btn-primary file-input-label">
          <span>📁 내 PDF 파일 선택</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {isProcessing && (
        <div className="progress-box">
          <p className="loading-text">{progressText}</p>
        </div>
      )}

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      {savedBookTitle && (
        <div className="success-banner">
          🎉 <strong>{savedBookTitle}</strong>이(가) 내 문제집(IndexedDB)에 저장되었습니다!
        </div>
      )}

      {words.length > 0 && (
        <div className="extracted-section">
          <div className="extracted-header">
            <h4>
              추출된 단어 목록 ({words.length}개)
              {fileSize > 0 && <small className="file-size-badge">({(fileSize / 1024).toFixed(1)} KB)</small>}
            </h4>
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
                {words.slice(0, 30).map((w, idx) => (
                  <tr key={w.id}>
                    <td className="text-center">{w.wordNumber ?? idx + 1}</td>
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
          {words.length > 30 && (
            <p className="more-words-notice">
              외 {words.length - 30}개의 단어가 더 있습니다. (문제집 저장 시 전체 {words.length}단어가 모두 포함됩니다)
            </p>
          )}
        </div>
      )}
    </div>
  );
};

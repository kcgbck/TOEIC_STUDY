import React, { useState } from 'react';
import { FileImportPocView } from './FileImportPocView';
import { PdfImportPocView } from './PdfImportPocView';

interface Props {
  onStartQuizWithWords: (
    words: Array<{ word: string; meaning: string[] }>,
    title?: string,
    sourceType?: 'photo' | 'pdf'
  ) => void;
  initialMode?: 'photo' | 'pdf';
}

export const CustomVocabularyUnifiedView: React.FC<Props> = ({
  onStartQuizWithWords,
  initialMode = 'photo',
}) => {
  const [mode, setMode] = useState<'photo' | 'pdf'>(initialMode);

  return (
    <div className="custom-vocab-unified-view" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* 사진 vs PDF 통합 선택 탭 */}
      <div className="book-selector-tabs" style={{ marginBottom: '4px' }}>
        <button
          type="button"
          className={`book-tab-btn ${mode === 'photo' ? 'active' : ''}`}
          onClick={() => setMode('photo')}
        >
          📷 사진 촬영 / 이미지 OCR
        </button>
        <button
          type="button"
          className={`book-tab-btn ${mode === 'pdf' ? 'active' : ''}`}
          onClick={() => setMode('pdf')}
        >
          📄 PDF 파일 어휘 추출
        </button>
      </div>

      {/* 선택된 모드 렌더링 */}
      {mode === 'photo' ? (
        <FileImportPocView
          onStartQuizWithWords={(words) =>
            onStartQuizWithWords(words, '사진 OCR 추출 영단어장', 'photo')
          }
        />
      ) : (
        <PdfImportPocView
          onStartQuizWithWords={(words) =>
            onStartQuizWithWords(words, 'PDF 추출 영단어장', 'pdf')
          }
        />
      )}
    </div>
  );
};

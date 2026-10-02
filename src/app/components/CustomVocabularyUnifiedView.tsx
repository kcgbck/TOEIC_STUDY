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
  onBack?: () => void;
}

export const CustomVocabularyUnifiedView: React.FC<Props> = ({
  onStartQuizWithWords,
  initialMode = 'photo',
  onBack,
}) => {
  const [mode, setMode] = useState<'photo' | 'pdf'>(initialMode);

  return (
    <div className="custom-vocab-unified-view" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* 사진 vs PDF 통합 선택 탭 및 뒤로가기 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        {onBack && (
          <button
            type="button"
            className="ranking-back-btn"
            onClick={onBack}
            title="홈으로 돌아가기"
            style={{ width: '34px', height: '34px', fontSize: '18px', flexShrink: 0 }}
          >
            ←
          </button>
        )}
        <div className="book-selector-tabs" style={{ flex: 1, margin: 0 }}>
          <button
            type="button"
            className={`book-tab-btn ${mode === 'photo' ? 'active' : ''}`}
            onClick={() => setMode('photo')}
          >
            <span>📷</span>
            <span>사진 / OCR</span>
          </button>
          <button
            type="button"
            className={`book-tab-btn ${mode === 'pdf' ? 'active' : ''}`}
            onClick={() => setMode('pdf')}
          >
            <span>📄</span>
            <span>PDF 어휘 추출</span>
          </button>
        </div>
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

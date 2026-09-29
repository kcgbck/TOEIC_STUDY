import React, { useState, useEffect } from 'react';
import { QuizPreviewView } from './components/QuizPreviewView';
import { FileImportPocView } from './components/FileImportPocView';
import { PdfImportPocView } from './components/PdfImportPocView';
import { SettingsModal, ThemeMode } from './components/SettingsModal';
import type { WordEntry } from '../types/word';
import './App.css';

type ActiveTab = 'home' | 'quiz' | 'photo' | 'pdf';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [customWords, setCustomWords] = useState<WordEntry[] | undefined>(undefined);
  const [customTitle, setCustomTitle] = useState<string | undefined>(undefined);
  const [customSourceType, setCustomSourceType] = useState<'builtin' | 'maritime' | 'photo' | 'pdf'>('builtin');

  // 테마 상태 ('dark' | 'light' | 'system')
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('voca_study_theme') as ThemeMode) || 'dark';
  });

  // 즉시 채점 설정 (기본: false - 실수 방지 모드)
  const [instantGrading, setInstantGrading] = useState<boolean>(() => {
    return localStorage.getItem('voca_study_instant_grading') === 'true';
  });

  // 문제 출제 순서 매번 랜덤 섞기 설정 (기본: true)
  const [shuffleOrder, setShuffleOrder] = useState<boolean>(() => {
    return localStorage.getItem('voca_study_shuffle_order') !== 'false';
  });

  // 설정 모달 열림 상태
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 테마 적용 이펙트
  useEffect(() => {
    const applyResolvedTheme = () => {
      let resolved = themeMode;
      if (themeMode === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolved);
    };

    applyResolvedTheme();
    localStorage.setItem('voca_study_theme', themeMode);

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyResolvedTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const handleInstantGradingChange = (enabled: boolean) => {
    setInstantGrading(enabled);
    localStorage.setItem('voca_study_instant_grading', enabled ? 'true' : 'false');
  };

  const handleShuffleOrderChange = (enabled: boolean) => {
    setShuffleOrder(enabled);
    localStorage.setItem('voca_study_shuffle_order', enabled ? 'true' : 'false');
  };

  const handleStartQuizWithWords = (
    words: Array<{ word: string; meaning: string[] }>,
    title?: string,
    sourceType: 'photo' | 'pdf' = 'photo'
  ) => {
    const entries: WordEntry[] = words.map((w) => ({
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: '단어',
      difficulty: 'medium',
      topic: 'custom',
    }));
    setCustomWords(entries);
    setCustomTitle(title || `추출 단어장 (${entries.length}단어)`);
    setCustomSourceType(sourceType);
    setActiveTab('quiz');
  };

  const handleOpenQuiz = (type: 'builtin' | 'maritime' = 'builtin') => {
    setCustomWords(undefined);
    setCustomTitle(undefined);
    setCustomSourceType(type);
    setActiveTab('quiz');
  };

  return (
    <div className="app-container">
      {/* 헤더: 1행(브랜드 좌측 + ⚙️ 우측 끝 같은 라인), 2행(4개 탭) */}
      <header className="app-header">
        <div className="header-top-row">
          <div className="header-brand" onClick={() => setActiveTab('home')}>
            <span className="brand-icon">📖</span>
            <h1 className="brand-title">보카 스터디</h1>
            <span className="brand-badge">Voca Study</span>
          </div>
          <button
            className="settings-icon-btn"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="설정"
            title="설정"
          >
            ⚙️
          </button>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            홈
          </button>
          <button
            className={`nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => handleOpenQuiz('builtin')}
          >
            기본 문제
          </button>
          <button
            className={`nav-btn ${activeTab === 'photo' ? 'active' : ''}`}
            onClick={() => setActiveTab('photo')}
          >
            사진 문제
          </button>
          <button
            className={`nav-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            PDF 문제
          </button>
        </nav>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="app-main">
        {activeTab === 'home' && (
          <div className="home-dashboard">
            <div className="action-menu-grid">
              <button className="menu-card primary" onClick={() => handleOpenQuiz('builtin')}>
                <span className="menu-icon">📝</span>
                <span className="menu-title">TOEIC(1800단어) 문제풀이</span>
                <span className="menu-sub">검증된 빈출 어휘 4지선다 문제학습</span>
              </button>

              <button className="menu-card maritime" onClick={() => handleOpenQuiz('maritime')}>
                <span className="menu-icon">⚓</span>
                <span className="menu-title">해사영어(451단어) 문제풀이</span>
                <span className="menu-sub">SMCP · 해기사 3·4급 · 국제협약(COLREGs/SOLAS/MARPOL)</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('photo')}>
                <span className="menu-icon">📷</span>
                <span className="menu-title">내 사진 문제집</span>
                <span className="menu-sub">사진 촬영/업로드 + 온디바이스 OCR 분석</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('pdf')}>
                <span className="menu-icon">📄</span>
                <span className="menu-title">내 PDF 문제집</span>
                <span className="menu-sub">PDF.js 기반 텍스트 레이어 어휘 추출</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizPreviewView
            key={customSourceType + (customTitle || '')}
            initialWords={customWords}
            bookTitle={customTitle}
            sourceType={customSourceType}
            instantGrading={instantGrading}
            shuffleOrder={shuffleOrder}
          />
        )}

        {activeTab === 'photo' && (
          <FileImportPocView
            onStartQuizWithWords={(words) =>
              handleStartQuizWithWords(words, '사진 OCR 추출 문제집', 'photo')
            }
          />
        )}

        {activeTab === 'pdf' && (
          <PdfImportPocView
            onStartQuizWithWords={(words) =>
              handleStartQuizWithWords(words, 'PDF 추출 문제집', 'pdf')
            }
          />
        )}
      </main>

      {/* 설정 모달 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        themeMode={themeMode}
        onThemeChange={setThemeMode}
        instantGrading={instantGrading}
        onInstantGradingChange={handleInstantGradingChange}
        shuffleOrder={shuffleOrder}
        onShuffleOrderChange={handleShuffleOrderChange}
      />
    </div>
  );
};


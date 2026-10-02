import React, { useState, useEffect } from 'react';
import { QuizPreviewView } from './components/QuizPreviewView';
import { FileImportPocView } from './components/FileImportPocView';
import { PdfImportPocView } from './components/PdfImportPocView';
import { GeneralQuizImportView } from './components/GeneralQuizImportView';
import { GeneralQuizPlayerView } from './components/GeneralQuizPlayerView';
import { RankingView } from './components/RankingView';
import { SettingsModal, ThemeMode } from './components/SettingsModal';
import { userService } from '../services/userService';
import type { WordEntry } from '../types/word';
import type { UserProfile } from '../types/user';
import './App.css';

type ActiveTab = 'home' | 'quiz' | 'photo' | 'pdf' | 'general_import' | 'general_quiz' | 'ranking';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedQuestionBookId, setSelectedQuestionBookId] = useState<string | null>(null);
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

  // 사용자 세션 프로필 상태
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    userService.initSession().then(setCurrentUser).catch(console.error);
  }, []);

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
      {/* 헤더: 1행(브랜드 좌측 + 🏆 랭킹 & ⚙️ 우측 끝 같은 라인), 2행(네비게이션 탭) */}
      <header className="app-header">
        <div className="header-top-row">
          <div className="header-brand" onClick={() => setActiveTab('home')}>
            <span className="brand-icon">📖</span>
            <h1 className="brand-title">보카 스터디</h1>
            <span className="brand-badge">Voca Study</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="ranking-icon-btn"
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onClick={() => setActiveTab('ranking')}
              title="실시간 랭킹"
            >
              <span>🏆</span>
              <span>랭킹</span>
            </button>
            <button
              className="settings-icon-btn"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="설정"
              title="설정"
            >
              ⚙️
            </button>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            홈
          </button>
          <button
            className={`nav-btn ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            🏆 랭킹
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
          <button
            className={`nav-btn ${activeTab === 'general_import' ? 'active' : ''}`}
            onClick={() => setActiveTab('general_import')}
          >
            일반 문제집
          </button>
        </nav>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="app-main">
        {activeTab === 'home' && (
          <div className="home-dashboard">
            {/* 상단 모바일 핏 내 학습 랭킹 요약 배너 */}
            <div
              onClick={() => setActiveTab('ranking')}
              style={{
                background: 'linear-gradient(135deg, #3730a3, #581c87)',
                borderRadius: '14px',
                padding: '12px 14px',
                color: '#ffffff',
                cursor: 'pointer',
                marginBottom: '12px',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '14px' }}>🏆</span>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#c7d2fe' }}>
                    {currentUser?.nickname || '학습자'}
                  </span>
                  <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '1px 5px', borderRadius: '4px' }}>
                    #{currentUser?.deviceCode?.split('-').pop() || 'ID'}
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#fde047' }}>
                  {currentUser?.totalScore || 0}점
                  <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#e0e7ff', marginLeft: '6px' }}>
                    (맞춤 {currentUser?.correctCount || 0} / 틀림 {currentUser?.incorrectCount || 0})
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: '#c7d2fe', display: 'block' }}>전체 랭킹</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}>
                  확인하기 →
                </span>
              </div>
            </div>

            <div className="action-menu-grid">
              <button
                className="menu-card primary"
                style={{ borderLeft: '4px solid #8b5cf6' }}
                onClick={() => setActiveTab('general_import')}
              >
                <span className="menu-icon">📚</span>
                <span className="menu-title">일반 문제집 만들기 (스캔/PDF)</span>
                <span className="menu-sub">어떤 문제집이든 사진·PDF로 4/5지선다 제작·풀이</span>
              </button>

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
                <span className="menu-title">내 사진 영단어</span>
                <span className="menu-sub">단어장 사진 촬영/업로드 + 온디바이스 OCR 분석</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('pdf')}>
                <span className="menu-icon">📄</span>
                <span className="menu-title">내 PDF 영단어</span>
                <span className="menu-sub">PDF.js 기반 텍스트 레이어 어휘 추출</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ranking' && (
          <RankingView
            onBack={() => {
              setActiveTab('home');
              userService.initSession().then(setCurrentUser).catch(console.error);
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizPreviewView
            key={customSourceType + (customTitle || '')}
            initialWords={customWords}
            bookTitle={customTitle}
            sourceType={customSourceType}
            instantGrading={instantGrading}
            shuffleOrder={shuffleOrder}
            onOpenRanking={() => setActiveTab('ranking')}
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

        {activeTab === 'general_import' && (
          <GeneralQuizImportView
            onBackToHome={() => setActiveTab('home')}
            onStartQuiz={(bookId) => {
              setSelectedQuestionBookId(bookId);
              setActiveTab('general_quiz');
            }}
          />
        )}

        {activeTab === 'general_quiz' && selectedQuestionBookId && (
          <GeneralQuizPlayerView
            bookId={selectedQuestionBookId}
            onBackToHome={() => setActiveTab('home')}
            onOpenRanking={() => setActiveTab('ranking')}
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
        onOpenRanking={() => {
          setIsSettingsOpen(false);
          setActiveTab('ranking');
        }}
      />
    </div>
  );
};


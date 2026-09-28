import React, { useState } from 'react';
import { InstallBanner } from './components/InstallBanner';
import { QuizPreviewView } from './components/QuizPreviewView';
import { FileImportPocView } from './components/FileImportPocView';
import { PdfImportPocView } from './components/PdfImportPocView';
import { StoragePocView } from './components/StoragePocView';
import type { WordEntry } from '../types/word';
import './App.css';

type ActiveTab = 'home' | 'quiz' | 'photo' | 'pdf' | 'storage_poc';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [customWords, setCustomWords] = useState<WordEntry[] | undefined>(undefined);
  const [customTitle, setCustomTitle] = useState<string | undefined>(undefined);

  const handleStartQuizWithWords = (words: Array<{ word: string; meaning: string[] }>, title?: string) => {
    const entries: WordEntry[] = words.map((w) => ({
      word: w.word,
      meaning: w.meaning,
      partOfSpeech: '단어',
      difficulty: 'medium',
      topic: 'toeic',
    }));
    setCustomWords(entries);
    setCustomTitle(title || `추출 단어장 (${entries.length}단어)`);
    setActiveTab('quiz');
  };

  return (
    <div className="app-container">
      {/* 헤더 */}
      <header className="app-header">
        <div className="header-brand" onClick={() => setActiveTab('home')}>
          <span className="brand-icon">📖</span>
          <h1 className="brand-title">보카 스터디</h1>
          <span className="brand-badge">Voca Study</span>
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
            onClick={() => setActiveTab('quiz')}
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
            className={`nav-btn ${activeTab === 'storage_poc' ? 'active' : ''}`}
            onClick={() => setActiveTab('storage_poc')}
          >
            저장소 관리
          </button>
        </nav>
      </header>

      {/* PWA 설치 배너 (Chrome 원클릭 / Safari 홈 화면 가이드) */}
      <InstallBanner />

      {/* 본문 콘텐츠 */}
      <main className="app-main">
        {activeTab === 'home' && (
          <div className="home-dashboard">
            <div className="welcome-hero">
              <h2>휴대폰에서 바로 설치하고 학습하는 영어단어 PWA</h2>
              <p className="hero-desc">
                별도 스토어 다운로드 없이 브라우저에서 실행되며, 종이책 사진과 PDF에서 단어·뜻을 추출하여 4지선다 문제로 학습합니다. (TOEIC® 시험 대비 지원)
              </p>
            </div>

            <div className="action-menu-grid">
              <button className="menu-card primary" onClick={() => setActiveTab('quiz')}>
                <span className="menu-icon">📝</span>
                <span className="menu-title">TOEIC® 대비 기본 단어</span>
                <span className="menu-sub">검증된 빈출 어휘 4지선다 문제풀이</span>
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

              <button className="menu-card" onClick={() => setActiveTab('storage_poc')}>
                <span className="menu-icon">💾</span>
                <span className="menu-title">로컬 저장소 (IndexedDB)</span>
                <span className="menu-sub">오프라인 무계정 데이터 영속화 & 백업/복원</span>
              </button>
            </div>

            <div className="feature-status-section">
              <h3>시스템 아키텍처 상태</h3>
              <div className="status-grid">
                <div className="status-item">
                  <span className="status-label">플랫폼:</span>
                  <span className="status-value text-accent">React + TypeScript + Vite PWA</span>
                </div>
                <div className="status-item">
                  <span className="status-label">배포 구조:</span>
                  <span className="status-value">Cloudflare Workers + Static Assets</span>
                </div>
                <div className="status-item">
                  <span className="status-label">저장소:</span>
                  <span className="status-value">IndexedDB (Dexie 계층)</span>
                </div>
                <div className="status-item">
                  <span className="status-label">PDF 엔진:</span>
                  <span className="status-value">PDF.js 브라우저 메모리 파서</span>
                </div>
                <div className="status-item">
                  <span className="status-label">사진 OCR:</span>
                  <span className="status-value text-accent">2단 분할 + Tesseract WASM</span>
                </div>
                <div className="status-item">
                  <span className="status-label">개인정보:</span>
                  <span className="status-value text-success">✓ 서버 전송 제로 (100% 로컬)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizPreviewView initialWords={customWords} bookTitle={customTitle} />
        )}

        {activeTab === 'photo' && (
          <FileImportPocView
            onStartQuizWithWords={(words) =>
              handleStartQuizWithWords(words, '사진 OCR 추출 문제집')
            }
          />
        )}

        {activeTab === 'pdf' && (
          <PdfImportPocView
            onStartQuizWithWords={(words) =>
              handleStartQuizWithWords(words, 'PDF 추출 문제집')
            }
          />
        )}

        {activeTab === 'storage_poc' && <StoragePocView />}
      </main>

      {/* 푸터 및 상표 고지문 (지시서 3항) */}
      <footer className="app-footer">
        <p>보카 스터디 (Voca Study) PWA • 버전 {__APP_VERSION__} (Git: {__GIT_SHA__}) • 100% 로컬 브라우저 저장</p>
        <div className="trademark-notice" style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', lineHeight: '1.4' }}>
          <p>TOEIC® is a registered trademark of ETS. This product is not endorsed or approved by ETS.</p>
          <p>TOEIC®은 ETS의 등록상표이며, 본 서비스는 ETS가 승인하거나 보증한 서비스가 아닙니다.</p>
        </div>
      </footer>
    </div>
  );
};


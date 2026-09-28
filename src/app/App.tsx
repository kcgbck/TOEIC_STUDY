import React, { useState } from 'react';
import { InstallBanner } from './components/InstallBanner';
import { QuizPreviewView } from './components/QuizPreviewView';
import { FileImportPocView } from './components/FileImportPocView';
import { PdfImportPocView } from './components/PdfImportPocView';
import { StoragePocView } from './components/StoragePocView';
import './App.css';

type ActiveTab = 'home' | 'quiz' | 'photo' | 'pdf' | 'wordbook' | 'storage_poc';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  return (
    <div className="app-container">
      {/* 헤더 */}
      <header className="app-header">
        <div className="header-brand" onClick={() => setActiveTab('home')}>
          <span className="brand-icon">📖</span>
          <h1 className="brand-title">토익_스터디</h1>
          <span className="brand-badge">PWA v2</span>
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
            저장소 POC
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
              <h2>휴대폰에서 바로 설치하고 학습하는 토익 어휘 PWA</h2>
              <p className="hero-desc">
                별도 스토어 다운로드 없이 브라우저에서 실행되며, 종이책 사진과 PDF에서 단어·뜻을 추출하여 4지선다 문제로 학습합니다.
              </p>
            </div>

            <div className="action-menu-grid">
              <button className="menu-card primary" onClick={() => setActiveTab('quiz')}>
                <span className="menu-icon">📝</span>
                <span className="menu-title">기본 문제풀기</span>
                <span className="menu-sub">검증된 TOEIC 빈출 어휘 4지선다 풀이</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('photo')}>
                <span className="menu-icon">📷</span>
                <span className="menu-title">사진으로 문제 만들기</span>
                <span className="menu-sub">단어책 촬영/사진에서 영단어·뜻 자동 추출</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('pdf')}>
                <span className="menu-icon">📄</span>
                <span className="menu-title">PDF로 문제 만들기</span>
                <span className="menu-sub">PDF.js 기반 텍스트 추출 및 Canvas 파싱</span>
              </button>

              <button className="menu-card" onClick={() => setActiveTab('storage_poc')}>
                <span className="menu-icon">💾</span>
                <span className="menu-title">로컬 저장소 (IndexedDB)</span>
                <span className="menu-sub">오프라인 무계정 데이터 영속화 POC</span>
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
                  <span className="status-label">오프라인:</span>
                  <span className="status-value">Service Worker 앱 셸 캐싱</span>
                </div>
                <div className="status-item">
                  <span className="status-label">개인정보:</span>
                  <span className="status-value text-success">✓ 서버 전송 제로 (100% 로컬)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && <QuizPreviewView />}
        {activeTab === 'photo' && <FileImportPocView />}
        {activeTab === 'pdf' && <PdfImportPocView />}
        {activeTab === 'storage_poc' && <StoragePocView />}
      </main>

      {/* 푸터 */}
      <footer className="app-footer">
        <p>토익_스터디 PWA • GitHub → Cloudflare Workers Builds • 오프라인 로컬 우선</p>
      </footer>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../storage/db';
import { downloadBackupFile, validateBackupFile, restoreBackupData, type BackupFileStructure } from '../../storage/backupService';
import { clearPocWords } from '../../storage/storagePoc';

export type ThemeMode = 'dark' | 'light' | 'system';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  instantGrading: boolean;
  onInstantGradingChange: (enabled: boolean) => void;
  shuffleOrder: boolean;
  onShuffleOrderChange: (enabled: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  themeMode,
  onThemeChange,
  instantGrading,
  onInstantGradingChange,
  shuffleOrder,
  onShuffleOrderChange,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  // 저장소 통계 및 상태
  const [storageStats, setStorageStats] = useState<{ words: number; books: number; history: number }>({
    words: 0,
    books: 0,
    history: 0,
  });
  const [storageMsg, setStorageMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshStorageStats = async () => {
    try {
      const [w, b, h] = await Promise.all([
        db.words.count(),
        db.wordBooks.count(),
        db.studyHistory.count(),
      ]);
      setStorageStats({ words: w, books: b, history: h });
    } catch (e) {
      console.warn('저장소 통계 로드 실패:', e);
    }
  };

  useEffect(() => {
    // 1. standalone 모드 확인
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    // 2. iOS Safari 감지
    const ua = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
    setIsIosSafari(isIos && isSafari && !checkStandalone);

    // 3. Chrome/Edge beforeinstallprompt 이벤트 캡처
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshStorageStats();
      setStorageMsg('');
    }
  }, [isOpen]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // 백업 파일 다운로드
  const handleBackupExport = async () => {
    try {
      const fileName = await downloadBackupFile();
      setStorageMsg(`✓ 백업 완료: ${fileName}`);
    } catch (err) {
      setStorageMsg(`백업 실패: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // 백업 파일 복원 선택
  const handleRestoreFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as BackupFileStructure;
        const summary = validateBackupFile(parsed);
        if (!summary.valid) {
          setStorageMsg(`✕ 유효하지 않은 백업 파일: ${summary.errorMessage}`);
          return;
        }

        if (window.confirm(`백업 파일(${summary.wordsCount}개 단어, ${summary.wordBooksCount}개 단어장)을 복원하시겠습니까?`)) {
          const res = await restoreBackupData(parsed, 'merge');
          setStorageMsg(`✓ 복원 완료: ${res.restoredWords}개 단어 복원됨`);
          await refreshStorageStats();
        }
      } catch (err) {
        setStorageMsg(`복원 실패: ${err instanceof Error ? err.message : '파일 파싱 오류'}`);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 저장소 초기화
  const handleStorageClear = async () => {
    if (!window.confirm('로컬에 저장된 모든 단어장과 학습 기록을 초기화하시겠습니까? (기본 1,800단어는 유지됩니다)')) return;
    try {
      await clearPocWords();
      await db.wordBooks.clear();
      await db.studyHistory.clear();
      setStorageMsg('✓ 로컬 데이터가 초기화되었습니다.');
      await refreshStorageStats();
    } catch (err) {
      setStorageMsg(`초기화 실패: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">⚙️ 환경 설정</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* 테마 설정 */}
          <div className="setting-section">
            <label className="setting-section-title">🎨 화면 테마</label>
            <div className="theme-toggle-group">
              <button
                type="button"
                className={`theme-toggle-btn ${themeMode === 'dark' ? 'active' : ''}`}
                onClick={() => onThemeChange('dark')}
              >
                🌙 다크
              </button>
              <button
                type="button"
                className={`theme-toggle-btn ${themeMode === 'light' ? 'active' : ''}`}
                onClick={() => onThemeChange('light')}
              >
                ☀️ 라이트
              </button>
              <button
                type="button"
                className={`theme-toggle-btn ${themeMode === 'system' ? 'active' : ''}`}
                onClick={() => onThemeChange('system')}
              >
                📱 시스템
              </button>
            </div>
          </div>

          {/* 문제 풀이 설정 */}
          <div className="setting-section">
            <label className="setting-section-title">📝 문제 풀이 설정</label>
            
            {/* 랜덤 섞기 토글 */}
            <label className="checkbox-setting-label" style={{ marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={shuffleOrder}
                onChange={(e) => onShuffleOrderChange(e.target.checked)}
              />
              <span className="checkbox-text">🔀 문제 출제 순서 매번 랜덤 섞기</span>
            </label>
            <p className="setting-help-text" style={{ marginBottom: '12px' }}>
              퀴즈를 시작하거나 다시 풀 때마다 단어 순서가 무작위로 섞여 출제됩니다.
            </p>

            {/* 보기 즉시 채점 토글 */}
            <label className="checkbox-setting-label">
              <input
                type="checkbox"
                checked={instantGrading}
                onChange={(e) => onInstantGradingChange(e.target.checked)}
              />
              <span className="checkbox-text">보기 선택 즉시 채점 (빠른 풀이)</span>
            </label>
            <p className="setting-help-text">
              체크 해제 시(기본) 보기를 터치해도 바로 채점되지 않고 <strong>[정답 확인]</strong>을 눌러야 채점되어 터치 실수를 방지할 수 있습니다.
            </p>
          </div>

          {/* 저장소 관리 섹션 (사용자 지시: 저장소 탭을 없애고 설정창 안에 통합) */}
          <div className="setting-section">
            <label className="setting-section-title">💾 로컬 저장소 (IndexedDB)</label>
            <div className="storage-summary-box">
              <span>내 문제집: <strong>{storageStats.books}</strong>권</span>
              <span> | </span>
              <span>추출 단어: <strong>{storageStats.words}</strong>개</span>
              <span> | </span>
              <span>학습 기록: <strong>{storageStats.history}</strong>건</span>
            </div>

            <div className="storage-btn-group">
              <button
                type="button"
                className="btn btn-secondary btn-storage-action"
                onClick={handleBackupExport}
              >
                📥 백업 파일 저장
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-storage-action"
                onClick={() => fileInputRef.current?.click()}
              >
                📤 백업 파일 복원
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleRestoreFileSelect}
              />
              <button
                type="button"
                className="btn btn-secondary btn-storage-action danger"
                onClick={handleStorageClear}
              >
                🗑️ 데이터 초기화
              </button>
            </div>

            {storageMsg && (
              <div className="storage-notice-msg">
                {storageMsg}
              </div>
            )}
          </div>

          {/* 홈 화면에 앱 설치하기 섹션 */}
          <div className="setting-section">
            <label className="setting-section-title">📲 앱 설치 (PWA)</label>
            {isStandalone ? (
              <div className="install-setting-box success">
                <span>✓ 현재 홈 화면 독립 앱으로 실행 중입니다.</span>
              </div>
            ) : deferredPrompt ? (
              <button className="btn-install" onClick={handleInstallClick}>
                ⬇ 홈 화면에 앱 설치하기
              </button>
            ) : isIosSafari ? (
              <div>
                <button
                  type="button"
                  className="btn-install-ios"
                  onClick={() => setShowIosGuide(!showIosGuide)}
                >
                  📱 iPhone 홈 화면에 추가하는 방법
                </button>
                {showIosGuide && (
                  <div className="ios-guide-box" style={{ marginTop: '8px' }}>
                    <p><strong>iPhone Safari 설치 방법:</strong></p>
                    <ol>
                      <li>하단 브라우저 메뉴의 <strong>공유 버튼 (⎋)</strong>을 누릅니다.</li>
                      <li>아래로 스크롤하여 <strong>'홈 화면에 추가 (⊞)'</strong>를 선택합니다.</li>
                      <li>우측 상단의 <strong>'추가'</strong>를 누르면 일반 앱처럼 실행됩니다.</li>
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <div className="install-setting-box info">
                <span>💡 브라우저 메뉴의 [홈 화면에 추가] 또는 [앱 설치]를 선택하면 독립 앱으로 사용하실 수 있습니다.</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary modal-confirm-btn" onClick={onClose}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

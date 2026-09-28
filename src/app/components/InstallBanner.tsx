import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // 1. standalone 모드 (이미 설치되어 실행 중인지 확인)
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    // 2. iOS Safari 감지
    const ua = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
    setIsIosSafari(isIos && isSafari && !checkStandalone);

    // 3. Chrome beforeinstallprompt 이벤트 캡처
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isStandalone) {
    return (
      <div className="install-banner standalone-badge">
        <span>✓ PWA 앱 실행 중 (홈 화면 독립 모드)</span>
      </div>
    );
  }

  return (
    <div className="install-banner">
      {deferredPrompt && (
        <button className="btn-install" onClick={handleInstallClick}>
          ⬇ 홈 화면에 앱 설치하기 (PWA)
        </button>
      )}

      {isIosSafari && (
        <div>
          <button className="btn-install-ios" onClick={() => setShowIosGuide(!showIosGuide)}>
            📱 iPhone 홈 화면에 추가하는 방법
          </button>
          {showIosGuide && (
            <div className="ios-guide-box">
              <p><strong>iPhone Safari 설치 방법:</strong></p>
              <ol>
                <li>하단 브라우저 메뉴의 <strong>공유 버튼 (⎋)</strong>을 누릅니다.</li>
                <li>아래로 스크롤하여 <strong>'홈 화면에 추가 (⊞)'</strong>를 선택합니다.</li>
                <li>우측 상단의 <strong>'추가'</strong>를 누르면 일반 앱처럼 실행됩니다.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {!deferredPrompt && !isIosSafari && (
        <div className="pwa-support-note">
          <span>ℹ PWA 지원 브라우저 (Chrome, Edge 등)에서 원클릭 앱 설치가 가능합니다.</span>
        </div>
      )}
    </div>
  );
};

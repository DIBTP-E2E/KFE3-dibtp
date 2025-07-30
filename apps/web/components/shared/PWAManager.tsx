'use client';

import { useEffect, useState } from 'react';

export const PWAManager = () => {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if PWA is supported
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      registerServiceWorker();
    }

    // Check if running in standalone mode
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Check if iOS device
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream?: unknown }).MSStream
    );
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available
                // eslint-disable-next-line no-console
                console.log('[PWA] New content is available; please refresh.');
              } else {
                // Content cached for offline use
                // eslint-disable-next-line no-console
                console.log('[PWA] Content is cached for offline use.');
              }
            }
          });
        }
      });
    } catch {}
  }

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Install prompt for iOS users */}
      {isIOS && !isStandalone && (
        <div className="fixed bottom-4 left-4 right-4 bg-bg-primary border border-border-primary rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-text-primary">앱을 홈 화면에 추가하세요</h3>
              <p className="text-xs text-text-secondary mt-1">
                공유 버튼 <span className="inline-block">⎋</span>을 누른 후 &quot;홈 화면에
                추가&quot; <span className="inline-block">➕</span>를 선택하세요.
              </p>
            </div>
            <button
              onClick={() => {
                // Hide the banner (this would be stored in localStorage in a real app)
                const banner = document.querySelector('[data-install-banner]');
                if (banner) {
                  (banner as HTMLElement).style.display = 'none';
                }
              }}
              className="text-text-secondary hover:text-text-primary"
              data-install-banner
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

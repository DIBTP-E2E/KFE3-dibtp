'use client';

import { useCallback } from 'react';

import type { UseDaumPostcodeOptions } from '@web/types';

export const useDaumPostcode = () => {
  const loadDaumPostcodeScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 이미 로드된 경우
      if (window.daum?.Postcode) {
        resolve();
        return;
      }

      // 이미 스크립트가 있는 경우
      const existingScript = document.getElementById('daum-postcode-script');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () =>
          reject(new Error('다음 우편번호 서비스 로드 실패'))
        );
        return;
      }

      // 새 스크립트 생성
      const script = document.createElement('script');
      script.id = 'daum-postcode-script';
      script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('다음 우편번호 서비스 로드 실패'));

      document.head.appendChild(script);
    });
  }, []);

  const openPostcode = useCallback(
    async (options: UseDaumPostcodeOptions) => {
      try {
        await loadDaumPostcodeScript();

        const postcode = new window.daum.Postcode({
          onComplete: options.onComplete,
          onClose: options.onClose,
          animation: true,
        });

        postcode.open();
      } catch (error) {
        console.error('우편번호 검색 오류:', error);
        throw error;
      }
    },
    [loadDaumPostcodeScript]
  );

  const embedPostcode = useCallback(
    async (element: HTMLElement, options: UseDaumPostcodeOptions) => {
      try {
        await loadDaumPostcodeScript();

        const postcode = new window.daum.Postcode({
          onComplete: options.onComplete,
          onClose: options.onClose,
          animation: false,
        });

        postcode.embed(element);
      } catch (error) {
        console.error('우편번호 검색 임베드 오류:', error);
        throw error;
      }
    },
    [loadDaumPostcodeScript]
  );

  return {
    openPostcode,
    embedPostcode,
  };
};

'use client';

import { useCallback } from 'react';

import type { UseDaumPostcodeOptions } from '@web/types';
import { loadExternalScript } from '@web/utils/common';

export const useDaumPostcode = () => {
  const loadDaumPostcodeScript = useCallback(async (): Promise<void> => {
    try {
      await loadExternalScript({
        id: 'daum-postcode-script',
        src: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
        isAlreadyLoaded: () => !!window.daum?.Postcode,
        onError: () => {
          throw new Error('다음 우편번호 서비스 로드 실패');
        },
      });
    } catch (error) {
      throw new Error('다음 우편번호 서비스 로드 실패');
    }
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
        if (process.env.NODE_ENV === 'development') {
          console.error('우편번호 검색 오류:', error);
        }
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
        if (process.env.NODE_ENV === 'development') {
          console.error('우편번호 검색 임베드 오류:', error);
        }
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

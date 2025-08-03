'use client';

/**
 * 성능 측정 자동화: Core Web Vitals 실시간 모니터링 컴포넌트
 *
 * 목적:
 * - 실제 사용자의 성능 지표를 실시간으로 수집
 * - 개발 환경에서는 콘솔 로그로 디버깅 지원
 *
 * 측정하는 Core Web Vitals:
 * - CLS (Cumulative Layout Shift): 레이아웃 이동 측정
 * - FCP (First Contentful Paint): 첫 콘텐츠 표시 시간
 * - INP (Interaction to Next Paint): 상호작용 지연 시간 (FID 후속 지표)
 * - LCP (Largest Contentful Paint): 최대 콘텐츠 표시 시간
 * - TTFB (Time to First Byte): 첫 바이트까지의 시간
 *
 * 사용법: layout.tsx에서 자동으로 로드됨
 */

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const WebVitalsReporter = () => {
  const pathname = usePathname(); // 현재 경로 추적

  useEffect(() => {
    /**
     * 성능 지표 수집 함수
     *
     * 환경별 동작:
     * - 개발 환경: 콘솔에 로그 출력하여 개발자가 실시간으로 확인 가능
     */
    const sendToAnalytics = (metric: Metric) => {
      // 개발 환경: 콘솔 로그로 실시간 성능 지표 확인
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('📊 Web Vitals:', {
          page: pathname, // 현재 페이지 경로 포함
          metric: metric.name,
          value: metric.value,
          unit: metric.name === 'CLS' ? 'score' : 'ms',
          rating: metric.rating,
          id: metric.id,
          delta: metric.delta,
          navigationType: metric.navigationType, // 네비게이션 타입 (reload, navigate, etc.)
        });
      }
    };

    // Core Web Vitals 측정 시작
    // 각 메트릭은 페이지 로드 시점부터 측정되며, 값이 변경될 때마다 콜백 실행
    onCLS(sendToAnalytics); // 레이아웃 이동 (누적)
    onFCP(sendToAnalytics); // 첫 콘텐츠 표시
    onINP(sendToAnalytics); // 상호작용 지연 (FID의 후속 지표)
    onLCP(sendToAnalytics); // 최대 콘텐츠 표시
    onTTFB(sendToAnalytics); // 첫 바이트까지의 시간

    // 페이지 변경 감지를 위한 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('🔄 Web Vitals Reporter: 페이지 변경 감지', pathname);
    }
  }, [pathname]); // pathname이 변경될 때마다 useEffect 재실행

  // 이 컴포넌트는 UI를 렌더링하지 않고 백그라운드에서 성능 측정만 수행
  return null;
};

export default WebVitalsReporter;

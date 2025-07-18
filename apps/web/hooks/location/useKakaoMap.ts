'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

import { isKakaoMapsLoaded, validateKakaoApiKey } from '@/utils/location';

interface UseKakaoMapOptions {
  center?: { lat: number; lng: number };
  level?: number;
  onClick?: (lat: number, lng: number) => void;
}

export const useKakaoMap = ({ center, level = 3, onClick }: UseKakaoMapOptions = {}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !isKakaoMapsLoaded()) return;

    const defaultCenter = center || { lat: 37.5665, lng: 126.978 }; // 서울시청 기본 위치
    const options = {
      center: new window.kakao.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
      level,
    };

    mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);

    if (onClick) {
      window.kakao.maps.event.addListener(
        mapInstance.current,
        'click',
        (mouseEvent: kakao.maps.event.MouseEvent) => {
          const latlng = mouseEvent.latLng;
          onClick(latlng.getLat(), latlng.getLng());
        }
      );
    }

    setIsLoaded(true);
  }, [center, level, onClick]);

  useEffect(() => {
    const loadScript = () => {
      if (isKakaoMapsLoaded()) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initializeMap);
      };
      script.onerror = () => {
        setError('카카오 지도 API 로드에 실패했습니다.');
      };
      document.head.appendChild(script);
    };

    if (validateKakaoApiKey()) loadScript();
  }, [initializeMap]);

  return {
    mapRef,
    mapInstance: mapInstance.current,
    isLoaded,
    error,
  };
};

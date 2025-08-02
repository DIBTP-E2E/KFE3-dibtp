'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

import { loadExternalScript } from '@web/utils/common';
import { isKakaoMapsLoaded, validateKakaoApiKey } from '@web/utils/location';

interface UseKakaoMapOptions {
  center?: { lat: number; lng: number };
  level?: number;
  onClick?: (lat: number, lng: number) => void;
  showZoomControl?: boolean; // 줌 컨트롤 표시 여부
}

export const useKakaoMap = ({
  center,
  level = 5,
  onClick,
  showZoomControl = true,
}: UseKakaoMapOptions = {}) => {
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

    // 줌 컨트롤 추가
    if (showZoomControl) {
      const zoomControl = new window.kakao.maps.ZoomControl();
      mapInstance.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    }

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
  }, [center, level, onClick, showZoomControl]);

  useEffect(() => {
    const loadScript = async () => {
      if (isKakaoMapsLoaded()) {
        initializeMap();
        return;
      }

      try {
        await loadExternalScript({
          id: 'kakao-maps-script',
          src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`,
          isAlreadyLoaded: isKakaoMapsLoaded,
          onLoad: () => {
            window.kakao.maps.load(initializeMap);
          },
          onError: () => {
            setError('카카오 지도 API 로드에 실패했습니다.');
          },
        });
      } catch (error) {
        setError('카카오 지도 API 로드에 실패했습니다.');
      }
    };

    if (validateKakaoApiKey()) {
      loadScript();
    }
  }, [initializeMap]);

  return {
    mapRef,
    mapInstance: mapInstance.current,
    isLoaded,
    error,
  };
};

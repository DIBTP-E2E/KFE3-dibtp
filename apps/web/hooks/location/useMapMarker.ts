'use client';

import { useRef, useCallback } from 'react';

import { isKakaoMapsLoaded } from '@/utils/location';

export const useMapMarker = (mapInstance: kakao.maps.Map | null) => {
  const markerInstance = useRef<kakao.maps.Marker | null>(null);

  const addMarker = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstance || !isKakaoMapsLoaded()) {
        console.warn('Map instance or Kakao Maps not available');
        return;
      }

      try {
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);

        // 기존 마커 제거
        if (markerInstance.current) {
          markerInstance.current.setMap(null);
        }

        // 새 마커 생성
        markerInstance.current = new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapInstance,
        });

        // 지도 중심을 마커 위치로 이동
        mapInstance.setCenter(markerPosition);
        markerInstance.current.setMap(mapInstance);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    },
    [mapInstance]
  );

  const removeMarker = useCallback(() => {
    if (markerInstance.current) {
      markerInstance.current.setMap(null);
      markerInstance.current = null;
    }
  }, []);

  return {
    addMarker,
    removeMarker,
    marker: markerInstance.current,
  };
};

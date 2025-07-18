'use client';

import { useRef, useCallback } from 'react';

import { isKakaoMapsLoaded } from '@/utils/location';

export const useMapMarker = (mapInstance: kakao.maps.Map | null) => {
  const markerInstance = useRef<kakao.maps.Marker | null>(null);

  const addMarker = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstance || !isKakaoMapsLoaded()) return;

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);

      if (markerInstance.current) {
        markerInstance.current.setPosition(markerPosition);
      } else {
        markerInstance.current = new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapInstance,
        });
      }

      mapInstance.setCenter(markerPosition);
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

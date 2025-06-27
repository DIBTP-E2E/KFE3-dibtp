'use client';

import React from 'react';

import { useKakaoGeocoder, useKakaoMap, useMapMarker } from '@/hooks';
import type { Location } from '@/types';
import { debounce } from '@/utils';

interface LocationMapProps {
  onLocationSelect: (location: Location) => void;
}

const LocationMap = ({ onLocationSelect }: LocationMapProps) => {
  const { convertCoordsToAddress } = useKakaoGeocoder();

  const handleMapClick = React.useMemo(
    () =>
      debounce(async (lat: number, lng: number) => {
        addMarker(lat, lng);

        try {
          const addressData = await convertCoordsToAddress(lat, lng);

          onLocationSelect({
            latitude: lat,
            longitude: lng,
            ...addressData,
          });
        } catch (error) {
          console.error('주소 변환 실패:', error);
        }
      }, 300),
    [convertCoordsToAddress, onLocationSelect]
  );

  const { mapRef, mapInstance, isLoaded, error } = useKakaoMap({
    onClick: handleMapClick,
  });

  const { addMarker } = useMapMarker(mapInstance);

  if (error) {
    return (
      <div className="w-full h-80 bg-bg-neutral rounded-lg flex items-center justify-center">
        <p className="text-text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-80 bg-bg-neutral rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-bg-neutral rounded-lg flex items-center justify-center">
          <p>지도를 로딩 중...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;

'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useKakaoGeocoder, useKakaoMap, useMapMarker } from '@web/hooks';
import type { Location } from '@web/types';
import { debounce } from '@web/utils/common';

interface LocationMapProps {
  onLocationSelect: (location: Location) => void;
  initialAddress?: { region: string; detail_address: string } | null;
}

const LocationMap = ({ onLocationSelect, initialAddress }: LocationMapProps) => {
  const { convertCoordsToAddress, convertAddressToCoords } = useKakaoGeocoder();

  const { mapRef, mapInstance, isLoaded, error } = useKakaoMap();
  const { addMarker } = useMapMarker(mapInstance);

  // 이전 초기 주소를 저장하여 불필요한 API 호출 방지
  const previousInitialAddress = useRef<string | null>(null);

  const handleMapClick = useMemo(
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
    [addMarker, convertCoordsToAddress, onLocationSelect]
  );

  // 지도 클릭 이벤트 설정
  useEffect(() => {
    if (mapInstance && handleMapClick) {
      const clickListener = (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        handleMapClick(latlng.getLat(), latlng.getLng());
      };

      if (typeof kakao !== 'undefined' && kakao.maps && kakao.maps.event) {
        kakao.maps.event.addListener(mapInstance, 'click', clickListener);

        return () => {
          kakao.maps.event.removeListener(mapInstance, 'click', clickListener);
        };
      }
    }
  }, [mapInstance, handleMapClick]);

  // 초기 주소가 있을 때 지도에 표시
  useEffect(() => {
    if (initialAddress && mapInstance && convertAddressToCoords) {
      const fullAddress = `${initialAddress.region} ${initialAddress.detail_address}`;

      // 이전 주소와 동일한 경우 API 호출 건너뛰기
      if (previousInitialAddress.current === fullAddress) {
        return;
      }

      previousInitialAddress.current = fullAddress;

      convertAddressToCoords(fullAddress)
        .then((coords: { latitude: number; longitude: number } | null) => {
          if (coords) {
            // 지도 중심을 초기 주소 위치로 이동
            if (typeof kakao !== 'undefined' && kakao.maps) {
              mapInstance.setCenter(new kakao.maps.LatLng(coords.latitude, coords.longitude));
            }
            // 마커 추가
            addMarker(coords.latitude, coords.longitude);
            // 초기 위치 정보를 상위 컴포넌트에 전달
            onLocationSelect({
              latitude: coords.latitude,
              longitude: coords.longitude,
              region: initialAddress.region,
              detail_address: initialAddress.detail_address,
              full_address: `${initialAddress.region} ${initialAddress.detail_address}`,
            });
          } else {
            console.warn('Failed to convert initial address to coordinates');
          }
        })
        .catch((error: Error) => {
          console.error('초기 주소 변환 실패:', error);
        });
    }
  }, [initialAddress, mapInstance, convertAddressToCoords, addMarker]);

  if (error) {
    return (
      <div className="w-full h-80 bg-bg-base rounded-lg flex items-center justify-center">
        <p className="text-text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-80 bg-bg-base rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-bg-base rounded-lg flex items-center justify-center">
          <p>지도를 로딩 중...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;

'use client';

import { useState, useEffect, useCallback } from 'react';

import { useDaumPostcode, useKakaoGeocoder, useGeolocation } from '@web/hooks';
import type { DaumPostcodeData, Location, Address } from '@web/types';
import { parsePostcodeAddress } from '@web/utils/location';

import AddressSearchButton from './AddressSearchButton';
import LocationDisplay from './LocationDisplay';
import LocationMap from './LocationMap';

interface LocationSelectorProps {
  initialAddress?: Address | null; // 초기 위치 정보
  onLocationSelect: (location: Location) => void; // 위치 선택 시 호출되는 콜백
  isForProduct?: boolean; // 상품용인지 여부 (주소 파싱 방식 결정)
  showAddressSearch?: boolean; // 주소 검색 버튼 표시 여부
  showCurrentLocation?: boolean; // 현재 위치 버튼 표시 여부
  showLocationDisplay?: boolean; // 선택된 위치 표시 여부
}

const LocationSelector = ({
  initialAddress,
  onLocationSelect,
  isForProduct = false,
  showAddressSearch = true,
  showCurrentLocation = true,
  showLocationDisplay = true,
}: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const { openPostcode } = useDaumPostcode();
  const { convertAddressToCoords, convertCoordsToAddress } = useKakaoGeocoder();
  const {
    getCurrentLocation,
    loading: geoLoading,
    error: geoError,
    coordinates,
    clearCoordinates,
  } = useGeolocation();

  // convertCoordsToAddress를 메모이제이션하여 불필요한 useEffect 재실행 방지
  const memoizedConvertCoordsToAddress = useCallback(convertCoordsToAddress, [
    convertCoordsToAddress,
  ]);

  const handleLocationSelect = useCallback(
    (location: Location) => {
      setSelectedLocation(location);
      onLocationSelect(location);
    },
    [onLocationSelect]
  );

  const handleAddressSearch = useCallback(() => {
    openPostcode({
      onComplete: async (data: DaumPostcodeData) => {
        try {
          // 다음 우편번호 데이터를 주소 형식으로 변환
          const addressInfo = parsePostcodeAddress(data, isForProduct);

          // 주소를 좌표로 변환
          const coords = await convertAddressToCoords(data.address);

          if (coords) {
            const location: Location = {
              ...addressInfo,
              latitude: coords.latitude,
              longitude: coords.longitude,
            };
            handleLocationSelect(location);
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('주소 검색 처리 중 오류:', error);
          }
        }
      },
    });
  }, [openPostcode, convertAddressToCoords, isForProduct, handleLocationSelect]);

  const handleCurrentLocationClick = useCallback(() => {
    setGeolocationError(null);
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 현재 위치 좌표를 받았을 때 주소로 변환하여 위치 설정
  useEffect(() => {
    if (coordinates) {
      const convertCurrentLocation = async () => {
        try {
          const addressInfo = await memoizedConvertCoordsToAddress(
            coordinates.latitude,
            coordinates.longitude,
            isForProduct
          );

          if (addressInfo) {
            const location: Location = {
              ...addressInfo,
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            };
            handleLocationSelect(location);
            // 현재 위치 사용 후 coordinates 클리어하여 다른 방법으로 위치 선택 시 간섭 방지
            clearCoordinates();
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('현재 위치 주소 변환 중 오류:', error);
          }
          setGeolocationError('현재 위치의 주소를 가져올 수 없습니다.');
          clearCoordinates(); // 오류 시에도 클리어
        }
      };

      convertCurrentLocation();
    }
  }, [
    coordinates,
    memoizedConvertCoordsToAddress,
    isForProduct,
    handleLocationSelect,
    clearCoordinates,
  ]);

  // Geolocation 오류 처리
  useEffect(() => {
    if (geoError) {
      setGeolocationError(geoError);
    }
  }, [geoError]);

  return (
    <div className="flex flex-col gap-sm">
      {/* 컨트롤 버튼들 */}
      {showAddressSearch && (
        <div className="mb-sm">
          <AddressSearchButton onSearch={handleAddressSearch} />
        </div>
      )}

      {/* 오류 메시지 표시 */}
      {(geolocationError || geoError) && (
        <div className="p-3 bg-bg-warning/10 border border-border-warning rounded-md mb-sm">
          <p className="text-sm text-text-warning">{geolocationError || geoError}</p>
        </div>
      )}

      {/* 지도 표시 */}
      <LocationMap
        onLocationSelect={handleLocationSelect}
        initialAddress={initialAddress}
        selectedLocation={selectedLocation}
        isForProduct={isForProduct}
        showCurrentLocationButton={showCurrentLocation}
        onCurrentLocationClick={handleCurrentLocationClick}
        currentLocationLoading={geoLoading}
      />

      {/* 선택된 위치 표시 */}
      {showLocationDisplay && selectedLocation && <LocationDisplay location={selectedLocation} />}
    </div>
  );
};

export default LocationSelector;

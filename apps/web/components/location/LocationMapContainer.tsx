'use client';

import { useState, useEffect } from 'react';

import { useDaumPostcode, useKakaoGeocoder, useGeolocation } from '@web/hooks';
import type { DaumPostcodeData, Location } from '@web/types';
import { parsePostcodeAddress } from '@web/utils/location';

import AddressSearchButton from './AddressSearchButton';
import LocationDisplay from './LocationDisplay';
import LocationMap from './LocationMap';
import SaveLocationButton from './SaveLocationButton';

const LocationMapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const { openPostcode } = useDaumPostcode();
  const { convertAddressToCoords, convertCoordsToAddress } = useKakaoGeocoder();
  const {
    getCurrentLocation,
    loading: geoLoading,
    error: geoError,
    coordinates,
  } = useGeolocation();

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleAddressSearch = () => {
    openPostcode({
      onComplete: async (data: DaumPostcodeData) => {
        try {
          // 다음 우편번호 데이터를 앱 주소 형식으로 변환
          const addressInfo = parsePostcodeAddress(data, false);

          // 주소를 좌표로 변환
          const coords = await convertAddressToCoords(data.address);

          if (coords) {
            const location: Location = {
              ...addressInfo,
              latitude: coords.latitude,
              longitude: coords.longitude,
            };

            setSelectedLocation(location);
          }
        } catch (error) {
          // 주소 검색 오류 로깅 (개발 환경에서만)
          if (process.env.NODE_ENV === 'development') {
            console.error('주소 검색 처리 중 오류:', error);
          }
        }
      },
    });
  };

  const handleCurrentLocationClick = () => {
    setGeolocationError(null);
    getCurrentLocation();
  };

  // 현재 위치 좌표를 받았을 때 주소로 변환하여 위치 설정
  useEffect(() => {
    if (coordinates) {
      const convertCurrentLocation = async () => {
        try {
          const addressInfo = await convertCoordsToAddress(
            coordinates.latitude,
            coordinates.longitude,
            false
          );

          if (addressInfo) {
            const location: Location = {
              ...addressInfo,
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            };

            setSelectedLocation(location);
          }
        } catch (error) {
          // 현재 위치 변환 오류 로깅 (개발 환경에서만)
          if (process.env.NODE_ENV === 'development') {
            console.error('현재 위치 주소 변환 중 오류:', error);
          }
          setGeolocationError('현재 위치의 주소를 가져올 수 없습니다.');
        }
      };

      convertCurrentLocation();
    }
  }, [coordinates, convertCoordsToAddress]);

  // Geolocation 오류 처리
  useEffect(() => {
    if (geoError) {
      setGeolocationError(geoError);
    }
  }, [geoError]);

  return (
    <>
      <div className="flex flex-col gap-sm mb-7xl">
        <div className="mb-sm">
          <AddressSearchButton onSearch={handleAddressSearch} />
        </div>

        {(geolocationError || geoError) && (
          <div className="p-3 bg-bg-warning/10 border border-border-warning rounded-md mb-sm">
            <p className="text-sm text-text-warning">{geolocationError || geoError}</p>
          </div>
        )}

        <LocationMap
          onLocationSelect={handleLocationSelect}
          selectedLocation={selectedLocation}
          showCurrentLocationButton
          onCurrentLocationClick={handleCurrentLocationClick}
          currentLocationLoading={geoLoading}
        />
        {selectedLocation && <LocationDisplay location={selectedLocation} />}
      </div>
      <SaveLocationButton selectedLocation={selectedLocation} />
    </>
  );
};

export default LocationMapContainer;

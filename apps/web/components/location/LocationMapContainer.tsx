'use client';

import { useState } from 'react';

import { useDaumPostcode, useKakaoGeocoder } from '@web/hooks';
import type { DaumPostcodeData, Location } from '@web/types';
import { parsePostcodeAddress } from '@web/utils/location';

import AddressSearchButton from './AddressSearchButton';
import LocationDisplay from './LocationDisplay';
import LocationMap from './LocationMap';
import SaveLocationButton from './SaveLocationButton';

const LocationMapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const { openPostcode } = useDaumPostcode();
  const { convertAddressToCoords } = useKakaoGeocoder();

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
          console.error('주소 검색 처리 중 오류:', error);
        }
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-sm mb-7xl">
        <div className="mb-sm">
          <AddressSearchButton onSearch={handleAddressSearch} />
        </div>
        <LocationMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
        {selectedLocation && <LocationDisplay location={selectedLocation} />}
      </div>
      <SaveLocationButton selectedLocation={selectedLocation} />
    </>
  );
};

export default LocationMapContainer;

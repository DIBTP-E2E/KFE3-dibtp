'use client';

import { useState, useCallback } from 'react';

import { FormMessage, Label } from '@repo/ui/components';

import { LocationMap, LocationDisplay } from '@web/components/location';

import type { Address, Location, ProductFormData } from '@web/types';

interface LocationInfoFieldProps {
  errors: Record<string, string>;
  onInputChange: (
    field: keyof ProductFormData
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  initialLocation?: Address | null; // 초기 위치 정보
}

const LocationInfoField = ({ errors, onInputChange, initialLocation }: LocationInfoFieldProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = useCallback(
    (location: Location) => {
      setSelectedLocation(location);

      // 폼 데이터 업데이트
      onInputChange('region')({
        target: { value: location.region },
      } as React.ChangeEvent<HTMLInputElement>);
      onInputChange('detail_address')({
        target: { value: location.detail_address },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    [onInputChange]
  );

  return (
    <div className="space-y-4">
      <Label required>거래 장소 선택</Label>
      <div className="flex flex-col gap-sm rounded-lg">
        {/* 지도 표시 */}
        <LocationMap
          onLocationSelect={handleLocationSelect}
          initialAddress={initialLocation}
          isForProduct={true}
        />
        {/* 선택된 위치 표시 */}
        {selectedLocation && <LocationDisplay location={selectedLocation} />}
      </div>

      {/* Hidden inputs for form data */}
      <input
        type="hidden"
        name="region"
        value={selectedLocation?.region || ''}
        onChange={onInputChange('region')}
      />
      <input
        type="hidden"
        name="detail_address"
        value={selectedLocation?.detail_address || ''}
        onChange={onInputChange('detail_address')}
      />

      {/* 오류 메시지 표시 */}
      {errors.region && <FormMessage type="error">{errors.region}</FormMessage>}
      {errors.detail_address && <FormMessage type="error">{errors.detail_address}</FormMessage>}
    </div>
  );
};

export default LocationInfoField;

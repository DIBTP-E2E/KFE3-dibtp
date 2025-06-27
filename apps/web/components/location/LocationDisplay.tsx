'use client';

import type { Location } from '@/types';

interface LocationDisplayProps {
  location: Location;
}

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  return (
    <div className="flex items-start">
      {/* <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" /> */}
      <div className="flex-1">
        <div className="font-style-small mb-2">선택된 위치</div>
        {/* 지역(region), 상세 주소(detail_address) 표시 */}
        <p className="font-style-large">{location.full_address}</p>

        <p className="font-style-small text-text-info">
          📍 {location.region} {location.detail_address}
        </p>
      </div>
    </div>
  );
};

export default LocationDisplay;

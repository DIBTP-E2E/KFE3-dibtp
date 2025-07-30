'use client';

import type { Location } from '@web/types';

interface LocationDisplayProps {
  location: Location;
}

const LocationDisplay = ({ location }: LocationDisplayProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-1">
        <div className="font-style-small mb-2">선택된 위치</div>
        <p className="font-style-large">{location.full_address}</p>

        <p className="font-style-small text-text-info">
          ㅇ 📍 {location.road_address || `${location.region} ${location.detail_address}`}
        </p>
      </div>
    </div>
  );
};

export default LocationDisplay;

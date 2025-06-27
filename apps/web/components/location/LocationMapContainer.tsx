'use client';

import { useState } from 'react';

import type { Location } from '@/types';

import LocationDisplay from './LocationDisplay';
import LocationMap from './LocationMap';
import SaveLocationButton from './SaveLocationButton';

const LocationMapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <div className="flex flex-col gap-sm bg-bg-neutral p-sm rounded-lg mb-7xl">
        <LocationMap onLocationSelect={handleLocationSelect} />
        {selectedLocation && <LocationDisplay location={selectedLocation} />}
      </div>
      <SaveLocationButton selectedLocation={selectedLocation} />
    </>
  );
};

export default LocationMapContainer;

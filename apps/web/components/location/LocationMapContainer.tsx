'use client';

import { useState } from 'react';

import type { Location } from '@web/types';

import LocationSelector from './LocationSelector';
import SaveLocationButton from './SaveLocationButton';

const LocationMapContainer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <div className="mb-7xl">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <SaveLocationButton selectedLocation={selectedLocation} />
    </>
  );
};

export default LocationMapContainer;

import { LocationHeader, LocationMapContainer } from '@/components/location';

const LocationPage = async () => {
  return (
    <article className="w-full">
      <LocationHeader />
      <LocationMapContainer />
    </article>
  );
};

export default LocationPage;

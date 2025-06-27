import { LocationHeader, LocationMapContainer } from '@/components/location';

const LocationPage = async () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <LocationHeader />
        <LocationMapContainer />
      </div>
    </main>
  );
};

export default LocationPage;

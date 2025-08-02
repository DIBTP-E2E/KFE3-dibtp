'use client';

import { Icon } from '@repo/ui/components';

interface CurrentLocationButtonProps {
  onGetLocation: () => void;
  loading: boolean;
  disabled?: boolean;
}

const CurrentLocationButton = ({
  onGetLocation,
  loading,
  disabled,
}: CurrentLocationButtonProps) => {
  return (
    <button
      onClick={onGetLocation}
      disabled={disabled || loading}
      className="absolute bottom-3 right-3 z-10 size-8 bg-bg-light border border-border-primary rounded-full shadow-lg flex items-center justify-center disabled:cursor-not-allowed"
      aria-label="현재 위치 사용"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-t-border-primary rounded-full animate-spin" />
      ) : (
        <>
          <Icon name="CurrentLocation" size="xs" className="text-text-primary" />
          <span className="sr-only">현재 위치 사용</span>
        </>
      )}
    </button>
  );
};

export default CurrentLocationButton;

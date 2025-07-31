import { useState, useCallback } from 'react';

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
}

interface UseGeolocationReturn extends GeolocationState {
  getCurrentLocation: () => void;
  clearError: () => void;
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000, // 5초 타임아웃
  maximumAge: 30000, // 30초 캐시
};

const ERROR_MESSAGES = {
  PERMISSION_DENIED: '위치 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.',
  POSITION_UNAVAILABLE: '위치 정보를 가져올 수 없습니다. GPS를 확인해주세요.',
  TIMEOUT: '위치 정보 요청이 시간 초과되었습니다. 다시 시도해주세요.',
  NOT_SUPPORTED: '이 브라우저는 위치 서비스를 지원하지 않습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
} as const;

export const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
  });

  const getCurrentLocation = useCallback(() => {
    // 브라우저 지원 확인
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: ERROR_MESSAGES.NOT_SUPPORTED,
        loading: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = ERROR_MESSAGES.PERMISSION_DENIED;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = ERROR_MESSAGES.POSITION_UNAVAILABLE;
            break;
          case error.TIMEOUT:
            errorMessage = ERROR_MESSAGES.TIMEOUT;
            break;
          default:
            errorMessage = ERROR_MESSAGES.UNKNOWN;
        }

        setState({
          loading: false,
          error: errorMessage,
          coordinates: null,
        });
      },
      GEOLOCATION_OPTIONS
    );
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    getCurrentLocation,
    clearError,
  };
};

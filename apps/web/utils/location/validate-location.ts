import type { Location } from '@/types';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// 위도, 경도 유효성 검사
const validateCoordinates = (lat: number, lng: number): ValidationResult => {
  if (lat < -90 || lat > 90) {
    return {
      isValid: false,
      error: '위도 값이 유효하지 않습니다.',
    };
  }

  if (lng < -180 || lng > 180) {
    return {
      isValid: false,
      error: '경도 값이 유효하지 않습니다.',
    };
  }

  return { isValid: true };
};

// 위치 정보 유효성 검사
export const validateLocationData = (location: Location): ValidationResult => {
  // 필수 필드 검증
  if (!location.latitude || !location.longitude || !location.region || !location.detail_address) {
    return {
      isValid: false,
      error: '위치 정보가 올바르지 않습니다.',
    };
  }

  // 좌표 검증
  const coordinateValidation = validateCoordinates(location.latitude, location.longitude);
  if (!coordinateValidation.isValid) {
    return coordinateValidation;
  }

  return { isValid: true };
};

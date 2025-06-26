'use server';

import { updateUserLocation } from '@/services';
import type { Location } from '@/types';
import { getAuthenticatedUser, handleError, validateLocationData } from '@/utils';

interface SaveLocationResult {
  success: boolean;
  error?: string;
  message?: string;
}

export const saveLocationAction = async (location: Location): Promise<SaveLocationResult> => {
  try {
    // 입력 데이터 검증
    const validationResult = validateLocationData(location);
    if (!validationResult.isValid) {
      return handleError(validationResult.error, '위치 데이터 검증');
    }

    // 사용자 인증 확인
    const authResult = await getAuthenticatedUser();
    if (!authResult.success) {
      return handleError(authResult.error, '인증 확인');
    }

    // 위치 정보 업데이트
    return await updateUserLocation({
      userId: authResult.userId!,
      region: location.region,
      detail_address: location.detail_address,
    });
  } catch (error) {
    return handleError(error, '위치 저장');
  }
};

'use server';

import { updateUserLocation } from '@web/services/location/server';

import type { Location } from '@web/types';

import { getUserIdCookie } from '@web/utils/auth/server';
import { handleError } from '@web/utils/error';
import { validateLocationData } from '@web/utils/location';

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
    const userId = await getUserIdCookie();
    if (!userId) {
      return handleError(
        {
          message: '로그인이 필요합니다.',
        },
        '인증 확인'
      );
    }

    // 위치 정보 업데이트
    return await updateUserLocation({
      userId: userId!,
      region: location.region,
      detail_address: location.detail_address,
    });
  } catch (error) {
    return handleError(error, '위치 저장');
  }
};

import { cookies } from 'next/headers';

import { COOKIES } from '@web/constants';

export interface CachedUserInfo {
  userId: string;
  region: string;
  detailAddress: string;
  lastUpdated: number;
}

/**
 * 🚀 쿠키에서 캐시된 사용자 정보를 빠르게 조회
 * - 인증 과정 없이 빠른 접근 (1ms 미만)
 * - middleware에서 인증된 정보만 저장되므로 안전
 * - prefetch 시에도 사용 가능
 */
export const getMyInfoCookie = async (): Promise<CachedUserInfo | null> => {
  try {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get(COOKIES.USER);

    if (!userInfoCookie?.value) {
      return null;
    }

    const userInfo = JSON.parse(userInfoCookie.value) as CachedUserInfo;

    // 쿠키 만료 체크 (30분)
    const isExpired = Date.now() - userInfo.lastUpdated > 30 * 60 * 1000;
    if (isExpired) {
      return null;
    }

    return userInfo;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching CachedUserInfo 파싱 에러', error);
    }

    // 파싱 에러 시 null 반환
    return null;
  }
};

/**
 * 🔍 사용자 ID만 빠르게 조회
 */
export const getMyUserIdCookie = async (): Promise<string | null> => {
  const userInfo = await getMyInfoCookie();
  return userInfo?.userId || null;
};

/**
 * 📍 사용자 위치 정보만 빠르게 조회
 */
export const getLocationCookie = async (): Promise<{
  region: string;
  detailAddress: string;
} | null> => {
  const userInfo = await getMyInfoCookie();

  if (!userInfo) return null;

  return {
    region: userInfo.region,
    detailAddress: userInfo.detailAddress,
  };
};

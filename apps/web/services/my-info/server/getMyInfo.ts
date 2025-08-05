import { prisma } from '@web/lib/prisma';

import type { MyInfoAPIServerResponse } from '@web/types';
import { getMyInfoCookie } from '@web/utils/auth/server';

export const getMyInfo = async (): Promise<MyInfoAPIServerResponse> => {
  try {
    // 쿠키에서 기본 정보 빠르게 조회
    const userInfo = await getMyInfoCookie();
    if (!userInfo) {
      throw new Error('User not authenticated');
    }

    // nickname과 profile_image만 DB에서 조회 (최소한의 DB 접근)
    const user = await prisma.users.findUnique({
      where: { user_id: userInfo.userId },
      select: {
        nickname: true,
        profile_image: true,
      },
    });

    return {
      userId: userInfo.userId,
      region: userInfo.region,
      detailAddress: userInfo.detailAddress,
      nickname: user?.nickname ?? '',
      profileImage: user?.profile_image ?? '',
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to get user region:', error);
    }

    throw new Error('Failed to get user region');
  }
};

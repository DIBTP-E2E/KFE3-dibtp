// TODO: 코드 중복 시 하나의 함수로 getUser 함수로 추상화

import { prisma } from '@web/lib/prisma';

import type { MyInfoAPIResponse } from '@web/types';
import { getAuthenticatedUser } from '@web/utils/auth/server';

export const getMyInfo = async (): Promise<MyInfoAPIResponse> => {
  try {
    const authResult = await getAuthenticatedUser();

    const user = await prisma.users.findUnique({
      where: { user_id: authResult.userId },
      select: {
        user_id: true,
        region: true,
      },
    });

    return {
      userId: user?.user_id ?? '',
      region: user?.region ?? '',
    }; // TODO: null 일 경우 어떻게 처리하는 것이 가장 좋을까?
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to get user region:', error);
    }

    throw new Error('Failed to get user region');
  }
};

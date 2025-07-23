import { prisma } from '@web/lib/prisma';
import type { MyInfoAPIResponse } from '@web/types';

export const getUserInfo = async (userId: string): Promise<MyInfoAPIResponse> => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        region: true,
        nickname: true,
        profile_image: true,
      },
    });

    return {
      userId: user?.user_id ?? '',
      region: user?.region ?? '',
      nickname: user?.nickname ?? '',
      profileImage: user?.profile_image ?? '',
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to get user info:', error);
    }

    throw new Error('Failed to get user info');
  }
};

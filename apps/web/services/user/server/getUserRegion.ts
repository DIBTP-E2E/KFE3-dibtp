// TODO: 코드 중복 시 하나의 함수로 getUser 함수로 추상화

import { prisma } from '@/lib/prisma';

import { getAuthenticatedUser } from '@/utils/auth/server';

export const getUserRegion = async (): Promise<string | null> => {
  try {
    const authResult = await getAuthenticatedUser();

    const user = await prisma.users.findUnique({
      where: { user_id: authResult.userId },
      select: {
        region: true,
      },
    });

    return user?.region || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to get user region:', error);
    }

    return null;
  }
};

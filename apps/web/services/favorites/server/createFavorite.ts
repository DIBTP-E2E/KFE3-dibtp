import { prisma } from '@/lib/prisma';

export const createFavorite = async (userId: string, productId: number) => {
  return prisma.favorites.create({
    data: {
      user_id: userId,
      product_id: productId,
    },
  });
};

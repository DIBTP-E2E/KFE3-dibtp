import { prisma } from '@/lib/prisma';

export const deleteFavorite = async (userId: string, productId: number) => {
  return prisma.favorites.delete({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
  });
};

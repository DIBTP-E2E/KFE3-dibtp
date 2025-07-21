import { prisma } from '@/lib/prisma';

export const getFavoriteStatus = async (userId: string, productId: number) => {
  const favorite = await prisma.favorites.findUnique({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
  });
  return !!favorite;
};

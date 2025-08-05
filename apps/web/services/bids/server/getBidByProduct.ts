import { prisma } from '@web/lib/prisma';

export const getBidByProduct = async (productId: number) => {
  try {
    const bid = await prisma.bids.findUnique({
      where: {
        product_id: BigInt(productId),
      },
    });
    return bid;
  } catch (error) {
    throw error;
  }
};

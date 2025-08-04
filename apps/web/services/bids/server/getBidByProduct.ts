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
    console.error('Error fetching bid by product ID:', error);
    console.error('Detailed error:', error); // 상세 에러 객체 로깅
    throw error;
  }
};

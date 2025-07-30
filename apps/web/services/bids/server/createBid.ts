import { prisma } from '@web/lib/prisma';
import type { TransactionClient } from '@web/types/lib';

/**
 * 새로운 입찰을 생성하는 서비스 함수
 * @param productId - 입찰할 상품의 ID
 * @param bidderUserId - 입찰자의 ID
 * @param bidPrice - 입찰 가격
 * @param tx - Prisma 트랜잭션 클라이언트 (옵션)
 */
export const createBid = async (
  productId: bigint,
  bidderUserId: string,
  bidPrice: number,
  tx?: TransactionClient
) => {
  const db = tx || prisma;
  try {
    const newBid = await db.bids.create({
      data: {
        product_id: productId,
        bidder_user_id: bidderUserId,
        bid_price: bidPrice,
        created_at: new Date(),
      },
    });

    return newBid;
  } catch (error) {
    console.error('입찰 생성 오류:', error);
    if (error instanceof Error && error.message.includes('Prisma')) {
      throw new Error('데이터베이스 오류가 발생했습니다');
    }
    throw new Error('입찰 생성 중 오류가 발생했습니다');
  }
};

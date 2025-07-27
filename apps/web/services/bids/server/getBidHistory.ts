import { Prisma } from '@prisma/client';


import { prisma } from '@web/lib/prisma';
import type { BidHistoryResponse } from '@web/types';
import { convertToBidHistoryResponse } from '@web/utils/bids';

/**
 * 사용자의 입찰 내역 조회 서비스 함수
 * @param userId - 사용자 ID
 * @param tx - Prisma 트랜잭션 클라이언트 (옵션)
 */
export const getBidHistory = async (
  userId: string,
  tx?: Prisma.TransactionClient
): Promise<BidHistoryResponse> => {
  const db = tx || prisma;

  try {
    // 입찰 내역 조회 (상품 정보 포함)
    const bids = await db.bids.findMany({
      where: {
        bidder_user_id: userId,
      },
      include: {
        products: {
          include: {
            product_images: {
              select: {
                image_id: true,
                image_url: true,
                image_order: true,
              },
              orderBy: { image_order: 'asc' },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 응답 데이터 변환
    const bidHistory: BidHistoryResponse = convertToBidHistoryResponse(bids);

    return bidHistory;
  } catch (error) {
    console.error('입찰 내역 조회 서비스 오류:', error);

    // Prisma 오류 처리
    if (error instanceof Error && error.message.includes('Prisma')) {
      throw new Error('데이터베이스 오류가 발생했습니다');
    }

    throw new Error('입찰 내역 조회 중 오류가 발생했습니다');
  }
};

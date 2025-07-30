import { PRODUCT_STATUS } from '@web/constants';
import { prisma } from '@web/lib/prisma';

import type { ProductStatus } from '@web/types';
import type { TransactionClient } from '@web/types/lib';

/**
 * 상품 상태를 업데이트하는 서비스 함수
 * @param productId - 상태를 변경할 상품의 ID
 * @param status - 새로운 상품 상태
 * @param tx - Prisma 트랜잭션 클라이언트 (옵션)
 */
export const updateProductStatus = async (
  productId: bigint,
  status: ProductStatus,
  tx?: TransactionClient
) => {
  const db = tx || prisma;
  try {
    const updatedProduct = await db.products.update({
      where: {
        product_id: productId,
      },
      data: {
        status,
        updated_at: new Date(),
        ...(status === PRODUCT_STATUS.ACTIVE && { auction_started_at: new Date().toISOString() }),
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error('상품 상태 업데이트 오류:', error);
    // Prisma 오류 처리
    if (error instanceof Error && error.message.includes('Prisma')) {
      throw new Error('데이터베이스 오류가 발생했습니다');
    }
    throw new Error('상품 상태 업데이트 중 오류가 발생했습니다');
  }
};

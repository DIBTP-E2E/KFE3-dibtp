import { PRODUCT_STATUS, PRODUCT_STATUS_MESSAGES } from '@web/constants';
import { updateProductStatus } from '@web/services/products/client';

/**
 * 상품 경매 시작
 * @param productId 상품 ID
 */
export const startAuction = async (productId: number): Promise<void> => {
  try {
    await updateProductStatus({
      productId: productId.toString(),
      status: PRODUCT_STATUS.ACTIVE,
    });

    // TODO: 성공 알림 및 상태 업데이트
    console.log(PRODUCT_STATUS_MESSAGES.AUCTION_STARTED);
  } catch (error) {
    console.log(PRODUCT_STATUS_MESSAGES.AUCTION_STOPPED);
    throw error;
  }
};

import { PRODUCT_STATUS, PRODUCT_STATUS_MESSAGES } from '@web/constants';
import { updateProductStatus } from '@web/services/products/client';

/**
 * 상품 경매 중단
 * @param productId 상품 ID
 */
export const stopAuction = async (productId: number): Promise<void> => {
  try {
    await updateProductStatus({
      productId: productId.toString(),
      status: PRODUCT_STATUS.CANCEL,
    });

    // TODO: 성공 알림 및 상태 업데이트
    console.log(PRODUCT_STATUS_MESSAGES.AUCTION_STOPPED);
  } catch (error) {
    console.log(PRODUCT_STATUS_MESSAGES.STATUS_CHANGE_FAILED);
    throw error;
  }
};

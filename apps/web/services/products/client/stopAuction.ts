import { PRODUCT_STATUS } from '@web/constants';
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
    console.log('경매가 중단되었습니다.');
  } catch (error) {
    console.error('경매 중단 오류:', error);
    throw error;
  }
};

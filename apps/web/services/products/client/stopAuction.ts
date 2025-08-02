import { PRODUCT_STATUS } from '@web/constants';
import { updateProductStatus } from '@web/services/products/client';

/**
 * 상품 경매 중단
 * @param productId 상품 ID
 */
export const stopAuction = async (productId: number): Promise<void> => {
  await updateProductStatus({
    productId: productId.toString(),
    status: PRODUCT_STATUS.CANCEL,
  });
};

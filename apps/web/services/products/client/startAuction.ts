import { updateProductStatus } from '@/services/products/client';

/**
 * 상품 경매 시작
 * @param productId 상품 ID
 */
export const startAuction = async (productId: number): Promise<void> => {
  try {
    await updateProductStatus({
      productId: productId.toString(),
      status: 'ACTIVE',
    });

    // TODO: 성공 알림 및 상태 업데이트
    console.log('경매가 시작되었습니다.');
  } catch (error) {
    console.error('경매 시작 오류:', error);
    throw error;
  }
};

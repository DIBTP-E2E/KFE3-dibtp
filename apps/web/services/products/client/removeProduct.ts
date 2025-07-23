import { API_ROUTES } from '@web/constants';

/**
 * 상품 제거 (출품 철회)
 * @param productId 상품 ID
 */
export const removeProduct = async (productId: number): Promise<void> => {
  try {
    const response = await fetch(API_ROUTES.PRODUCT_BY_ID(productId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '상품 삭제에 실패했습니다.');
    }

    // TODO: 성공 알림 및 목록에서 제거
    console.log('상품이 삭제되었습니다.');
  } catch (error) {
    console.error('상품 삭제 오류:', error);
    throw error;
  }
};

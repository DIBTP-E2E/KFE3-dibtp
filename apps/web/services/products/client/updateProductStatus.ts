import { API_ROUTES } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface UpdateProductStatusParams {
  productId: string;
  status: ProductStatus;
}

interface UpdateProductStatusResponse {
  message: string;
  product: {
    product_id: string;
    status: ProductStatus;
    updated_at: string;
  };
}

export const updateProductStatus = async (
  params: UpdateProductStatusParams
): Promise<UpdateProductStatusResponse> => {
  const response = await fetch(API_ROUTES.PRODUCT_STATUS, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '상품 상태 업데이트에 실패했습니다');
  }

  return response.json();
};

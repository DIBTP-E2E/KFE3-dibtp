import { API_ROUTES } from '@/constants';
import type { ProductFormData, UploadedImage, ProductCreationResponse } from '@/types';

/**
 * DB에 product 추가
 */
export const createProduct = async (
  productData: ProductFormData,
  uploadedImages: UploadedImage[] = []
): Promise<ProductCreationResponse> => {
  const response = await fetch(API_ROUTES.PRODUCTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      images: uploadedImages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || '상품 등록에 실패했습니다');
  }

  return response.json();
};

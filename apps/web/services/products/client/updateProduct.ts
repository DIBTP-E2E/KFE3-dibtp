import { API_ROUTES } from '@web/constants';
import { ProductFormData, UploadedImage, ProductCreationResponse } from '@web/types';

/**
 * DB에서 product 수정
 */
export const updateProduct = async (
  productId: string,
  productData: ProductFormData,
  uploadedImages: UploadedImage[] = [],
  existingImages: string[] = [],
  orderedImages?: Array<{ url: string; type: 'existing' | 'new'; file?: File }>
): Promise<ProductCreationResponse> => {
  const response = await fetch(`${API_ROUTES.PRODUCTS}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      images: uploadedImages,
      existingImages: existingImages,
      orderedImages: orderedImages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || '상품 수정에 실패했습니다');
  }

  return response.json();
};

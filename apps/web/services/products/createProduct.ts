import { API_ROUTES } from '@/constants';
import type { ProductFormData, UploadedImage, ProductCreationResponse } from '@/types';

import { uploadImages, deleteImages } from '../images/client';

/**
 * DB에 product 추가
 */
const createProduct = async (
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

/**
 * 이미지 storage에 업로드 후 DB에 데이터 추가 함수
 */
const registerProduct = async (
  productData: ProductFormData,
  images: File[]
): Promise<ProductCreationResponse> => {
  let uploadedImages: UploadedImage[] = [];

  try {
    // 1. 이미지 storage에 업로드
    uploadedImages = await uploadImages(images);

    // 2. 업로드된 이미지와 함께 상품 DB 등록
    const result = await createProduct(productData, uploadedImages);

    return result;
  } catch (error) {
    // 이미지 업로드는 성공했지만 상품 등록에 실패한 경우
    // 업로드된 이미지들을 스토리지에서 삭제하여 정리
    if (uploadedImages.length > 0) {
      console.warn('상품 등록 실패로 인한 이미지 정리를 시작합니다:', uploadedImages);
      try {
        await deleteImages(uploadedImages);
        console.log('업로드된 이미지들이 성공적으로 삭제되었습니다');
      } catch (deleteError) {
        console.error('이미지 삭제 중 오류가 발생했습니다:', deleteError);
        // 삭제 실패해도 원본 에러를 우선적으로 던짐
      }
    }

    // 구체적인 에러 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('storage') || error.message.includes('upload')) {
        throw new Error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('네트워크 오류로 상품 등록에 실패했습니다. 다시 시도해주세요.');
      }
      throw new Error(error.message);
    }

    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};

export { registerProduct };

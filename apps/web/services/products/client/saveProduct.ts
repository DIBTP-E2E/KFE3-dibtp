import { uploadImages, deleteImages } from '@web/services/images/client';
import { ProductFormData, ProductCreationResponse, UploadedImage } from '@web/types';

import { createProduct } from './createProduct';
import { updateProduct } from './updateProduct';

export const saveProduct = async (
  productData: ProductFormData,
  images: File[],
  options: {
    mode: 'create' | 'edit';
    productId?: string;
    existingImages?: string[];
    orderedImages?: Array<{ url: string; type: 'existing' | 'new'; file?: File }>;
  }
): Promise<ProductCreationResponse> => {
  const { mode, productId, existingImages = [], orderedImages } = options;
  let uploadedImages: UploadedImage[] = [];

  try {
    // 1. 새로운 이미지가 있다면 storage에 업로드
    if (images.length > 0) {
      uploadedImages = await uploadImages(images);
    }

    // 2. 모드에 따라 상품 생성 또는 수정
    let result: ProductCreationResponse;

    if (mode === 'create') {
      result = await createProduct(productData, uploadedImages);
    } else {
      if (!productId) {
        throw new Error('상품 ID가 필요합니다');
      }
      result = await updateProduct(
        productId,
        productData,
        uploadedImages,
        existingImages,
        orderedImages
      );
    }

    return result;
  } catch (error) {
    // 이미지 업로드는 성공했지만 상품 생성/수정에 실패한 경우
    // 업로드된 이미지들을 스토리지에서 삭제하여 정리
    if (uploadedImages.length > 0) {
      try {
        await deleteImages(uploadedImages);
      } catch {
        // 삭제 실패해도 원본 에러를 우선적으로 던짐
      }
    }

    // 구체적인 에러 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('storage') || error.message.includes('upload')) {
        throw new Error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        const action = mode === 'create' ? '등록' : '수정';
        throw new Error(`네트워크 오류로 상품 ${action}에 실패했습니다. 다시 시도해주세요.`);
      }
      throw new Error(error.message);
    }

    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};

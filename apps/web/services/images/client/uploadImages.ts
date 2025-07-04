import { API_ENDPOINTS } from '@/constants';
import type { ImageUploadResponse, UploadedImage } from '@/types';

/**
 * 클라이언트에서 API를 통해 이미지 업로드
 */
export const uploadImages = async (images: File[]): Promise<UploadedImage[]> => {
  if (images.length === 0) return [];

  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await fetch(API_ENDPOINTS.IMAGES, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || '이미지 업로드에 실패했습니다');
  }

  const result: ImageUploadResponse = await response.json();
  return result.images;
};

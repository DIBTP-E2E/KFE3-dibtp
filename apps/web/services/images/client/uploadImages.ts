import { API_ROUTES } from '@/constants';
import type { UploadedImage } from '@/types';

/**
 * 클라이언트에서 API를 통해 이미지 업로드
 */
export const uploadImages = async (
  images: File[],
  type: string = 'product'
): Promise<UploadedImage[]> => {
  if (images.length === 0) return [];

  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  formData.append('type', type);

  const response = await fetch(API_ROUTES.IMAGES, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || '이미지 업로드에 실패했습니다');
  }

  const result = await response.json();
  return result.images;
};

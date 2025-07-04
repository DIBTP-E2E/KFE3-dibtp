import { z } from 'zod';

import { PRODUCT_MAX_IMAGES } from '@/constants';

// 이미지 파일 유효성 검사 스키마
export const imageFileSchema = z.object({
  name: z.string(),
  size: z.number().max(5 * 1024 * 1024, '이미지 크기는 5MB 이하여야 합니다'),
  type: z
    .string()
    .refine(
      (type) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(type),
      '지원되는 이미지 형식: JPEG, PNG, WebP'
    ),
});

// 다중 이미지 업로드 스키마
export const multipleImagesSchema = z.object({
  images: z
    .array(imageFileSchema)
    .min(1, '최소 1개의 이미지를 업로드해주세요')
    .max(PRODUCT_MAX_IMAGES, `최대 ${PRODUCT_MAX_IMAGES}개의 이미지만 업로드할 수 있습니다`),
});

// 클라이언트 사이드 파일 유효성 검사
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  try {
    imageFileSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message || '유효하지 않은 파일입니다' };
    }
    return { valid: false, error: '파일 검증 중 오류가 발생했습니다' };
  }
}

// 다중 파일 유효성 검사
export function validateMultipleImages(
  files: File[],
  maxImages: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (files.length === 0) {
    errors.push('최소 1개의 이미지를 업로드해주세요');
  }

  if (files.length > maxImages) {
    errors.push(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다`);
  }

  files.forEach((file, index) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      errors.push(`이미지 ${index + 1}: ${validation.error}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

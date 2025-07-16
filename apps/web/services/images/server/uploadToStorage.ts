import { uploadImageServer } from '@/lib/storage/server';
import { validateImageFile } from '@/lib/validations';

import { generateImagePath } from '@/utils/image';

/**
 * 서버에서 직접 스토리지에 이미지 업로드
 */
export const uploadToStorage = async (files: File[], userId: string) => {
  const uploadResults = [];
  const errors = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file) {
      errors.push(`이미지 ${i + 1}: 파일이 없습니다`);
      continue;
    }

    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.valid) {
      errors.push(`이미지 ${i + 1}: ${validation.error}`);
      continue;
    }

    // 파일 경로 생성
    const imagePath = generateImagePath(userId, file.name);

    // 이미지 업로드
    const uploadResult = await uploadImageServer(file, imagePath);

    if (uploadResult.success) {
      uploadResults.push({
        url: uploadResult.url,
        path: uploadResult.path,
        originalName: file.name,
      });
    } else {
      errors.push(`이미지 ${i + 1}: ${uploadResult.error}`);
    }
  }

  return {
    success: uploadResults.length > 0,
    uploadResults,
    errors,
  };
};

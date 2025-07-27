import { IMAGE_CONFIGS } from '@web/constants';
import { uploadImageServer } from '@web/lib/storage/server';
import type { ImageConfigType, UploadedImage } from '@web/types';
import { generateImagePath } from '@web/utils/image';

/**
 * 타입별 이미지 업로드 서비스
 */
export const uploadToStorage = async (
  files: File[],
  userId: string,
  configType: ImageConfigType = 'product'
) => {
  const config = IMAGE_CONFIGS[configType];
  const uploadResults: UploadedImage[] = [];
  const errors: string[] = [];

  // 파일 개수 검사
  if (files.length > config.maxCount) {
    errors.push(`최대 ${config.maxCount}개의 이미지만 업로드할 수 있습니다`);
    return { success: false, uploadResults, errors };
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file) {
      errors.push(`이미지 ${i + 1}: 파일이 없습니다`);
      continue;
    }

    // 파일 타입 검사
    if (!(config.allowedTypes as readonly string[]).includes(file.type)) {
      errors.push(
        `이미지 ${i + 1}: 지원하지 않는 파일 형식입니다. (${config.allowedTypes.join(', ')})`
      );
      continue;
    }

    // 파일 크기 검사 (config 기반)
    if (file.size > config.maxSize) {
      errors.push(`이미지 ${i + 1}: 파일 크기가 ${config.maxSize / (1024 * 1024)}MB를 초과합니다`);
      continue;
    }

    // 기본 파일 검증 (파일명 등)
    if (!file.name || file.size === 0) {
      errors.push(`이미지 ${i + 1}: 잘못된 파일입니다`);
      continue;
    }

    // 파일 경로 생성 (타입별 경로)
    const pathPrefix = config.storage.pathPrefix(userId);
    const imagePath = generateImagePath(pathPrefix, file.name);

    // 이미지 업로드 (기존 함수 재사용하되 bucket 동적 설정)
    const uploadResult = await uploadImageServer(file, imagePath, config.storage.bucket);

    if (uploadResult.success && uploadResult.url && uploadResult.path) {
      uploadResults.push({
        url: uploadResult.url,
        path: uploadResult.path,
        originalName: file.name,
      });
    } else {
      errors.push(`이미지 ${i + 1}: ${uploadResult.error || '업로드 실패'}`);
    }
  }

  return {
    success: uploadResults.length > 0,
    uploadResults,
    errors,
  };
};

import { IMAGE_CONFIGS } from '@web/constants';
import { deleteImageServer } from '@web/lib/storage/server';
import type { ImageConfigType } from '@web/types';

/**
 * 타입별 통합 이미지 삭제 서비스
 */
export const deleteFromStorage = async (
  paths: string[],
  userId: string,
  configType: ImageConfigType = 'product'
) => {
  const config = IMAGE_CONFIGS[configType];
  const deleteResults = [];
  const errors = [];

  for (const path of paths) {
    if (typeof path !== 'string') {
      errors.push(`잘못된 경로 형식: ${path}`);
      continue;
    }

    // 보안: 해당 타입의 사용자 폴더 내 파일만 삭제 가능하도록 검증
    const allowedPrefix = config.storage.pathPrefix(userId);
    if (!path.startsWith(allowedPrefix)) {
      errors.push(`권한이 없는 파일: ${path}`);
      continue;
    }

    // 기존 함수 재사용하되 bucket 동적 설정
    const deleteResult = await deleteImageServer(path, config.storage.bucket);

    if (deleteResult.success) {
      deleteResults.push(path);
    } else {
      errors.push(`${path}: ${deleteResult.error}`);
    }
  }

  return {
    success: deleteResults.length > 0,
    deleteResults,
    errors,
  };
};

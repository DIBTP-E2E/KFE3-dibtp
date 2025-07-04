import { deleteImage } from '@/lib/storage';

/**
 * 서버에서 직접 스토리지에서 이미지 삭제
 */
export const deleteFromStorage = async (paths: string[], userId: string) => {
  const deleteResults = [];
  const errors = [];

  for (const path of paths) {
    if (typeof path !== 'string') {
      errors.push(`잘못된 경로 형식: ${path}`);
      continue;
    }

    // 보안: 사용자의 폴더 내 파일만 삭제 가능하도록 검증
    if (!path.startsWith(`products/${userId}/`)) {
      errors.push(`권한이 없는 파일: ${path}`);
      continue;
    }

    const deleteResult = await deleteImage(path);

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

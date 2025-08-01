import { IMAGE_CONFIGS } from '@web/constants';
import { ImageConfigType } from '@web/types';

// 파일 경로 생성 유틸리티
export const generateImagePath = (pathPrefix: string, fileName: string) => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  const randomId = Math.random().toString(36).substring(2, 15);
  return `${pathPrefix}/${timestamp}_${randomId}.${extension}`;
};

// 이미지 파일 유효성 검사
export const validateImageFile = (file: File, configType: ImageConfigType = 'product') => {
  const config = IMAGE_CONFIGS[configType];

  // 파일 타입 검사
  if (!(config.allowedTypes as readonly string[]).includes(file.type)) {
    return {
      isValid: false,
      error: `지원하지 않는 파일 형식입니다. (${config.allowedTypes.join(', ')})`,
    };
  }

  // 파일 크기 검사
  if (file.size > config.maxSize) {
    return {
      isValid: false,
      error: `파일 크기가 ${config.maxSize / (1024 * 1024)}MB를 초과합니다`,
    };
  }

  // 파일명 검사
  if (!file.name || file.size === 0) {
    return {
      isValid: false,
      error: '잘못된 파일입니다',
    };
  }

  return { isValid: true, error: null };
};

// 이미지 URL에서 스토리지 경로를 추출하는 유틸리티 함수
export const extractStoragePath = (imageUrl: string): string | null => {
  try {
    const url = new URL(imageUrl);

    // Supabase 스토리지 URL 패턴: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    if (url.hostname.includes('supabase.co')) {
      const pathSegments = url.pathname.split('/');
      const publicIndex = pathSegments.indexOf('public');

      if (publicIndex !== -1 && publicIndex < pathSegments.length - 1) {
        // bucket 다음부터가 실제 스토리지 경로
        const storagePath = pathSegments.slice(publicIndex + 2).join('/');
        return storagePath || null;
      }
    }

    return null;
  } catch (error) {
    console.error('이미지 URL 파싱 오류:', error);
    return null;
  }
};

// 여러 이미지 URL에서 스토리지 경로들을 추출
export const extractStoragePaths = (imageUrls: string[]): string[] => {
  return imageUrls.map(extractStoragePath).filter((path): path is string => path !== null);
};

import { IMAGE_CONFIGS } from '@web/constants';
import { supabaseServerClient } from '@web/lib/supabase/server';
import type { ImageConfigType } from '@web/types';

type TransformType = 'thumbnail' | 'preview' | 'full';

/**
 * 이미지 변환 설정을 가져오는 헬퍼 함수
 */
const getTransformConfig = (configType: ImageConfigType, transformType: TransformType) => {
  const config = IMAGE_CONFIGS[configType];
  const transforms = config.transforms;

  if (!transforms || !(transformType in transforms)) {
    return { config, transform: undefined };
  }

  return {
    config,
    transform: transforms[transformType as keyof typeof transforms],
  };
};

/**
 * Supabase 변환 기능을 활용한 이미지 URL 생성
 */
export const getTransformedImageUrl = async (
  path: string,
  configType: ImageConfigType = 'product',
  transformType: TransformType = 'full'
) => {
  const { config, transform } = getTransformConfig(configType, transformType);
  const supabase = await supabaseServerClient();

  if (!transform) {
    // 변환 설정이 없으면 원본 URL 반환
    const { data } = supabase.storage.from(config.storage.bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  // Supabase 변환 기능 사용
  const { data } = supabase.storage.from(config.storage.bucket).getPublicUrl(path, { transform });

  return data.publicUrl;
};

/**
 * 클라이언트에서 사용할 수 있는 변환 URL 생성 (서버 없이)
 */
export const getClientTransformedImageUrl = (
  publicUrl: string,
  configType: ImageConfigType = 'product',
  transformType: TransformType = 'full'
) => {
  const { transform } = getTransformConfig(configType, transformType);

  if (!transform || !publicUrl.includes('supabase')) {
    return publicUrl;
  }

  // URL에 transform 파라미터 추가
  const url = new URL(publicUrl);

  if ('width' in transform && transform.width) {
    url.searchParams.set('width', transform.width.toString());
  }

  if ('height' in transform && transform.height) {
    url.searchParams.set('height', transform.height.toString());
  }

  if ('quality' in transform && transform.quality) {
    url.searchParams.set('quality', transform.quality.toString());
  }

  if ('resize' in transform && transform.resize) {
    url.searchParams.set('resize', transform.resize);
  }

  return url.toString();
};

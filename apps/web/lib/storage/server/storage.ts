import { supabaseServerClient } from '@/lib/supabase/server';

import { STORAGE_BUCKET } from '@/constants';

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

// 서버 사이드 업로드 (bucket 동적 지원)
export const uploadImageServer = async (
  file: File,
  path: string,
  bucketName: string = STORAGE_BUCKET.PRODUCT_IMAGES
): Promise<UploadResult> => {
  try {
    const supabase = await supabaseServerClient();

    const { data, error } = await supabase.storage.from(bucketName).upload(path, file, {
      upsert: false,
      contentType: file.type,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다',
    };
  }
};

// 이미지 삭제 (bucket 동적 지원)
export const deleteImageServer = async (
  path: string,
  bucketName: string = STORAGE_BUCKET.PRODUCT_IMAGES
) => {
  try {
    const supabase = await supabaseServerClient();

    const { error } = await supabase.storage.from(bucketName).remove([path]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다',
    };
  }
};

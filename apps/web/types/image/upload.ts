// 이미지 업로드 관련 타입들
export interface UploadedImage {
  url: string;
  path?: string;
  originalName?: string;
}

// 이미지 변환 타입
export interface ImageTransform {
  width?: number;
  height?: number;
  resize?: 'cover' | 'contain' | 'fill';
  quality?: number;
}

// 업로드 옵션
export interface ImageUploadOptions {
  type?: 'product' | 'profile';
  maxCount?: number;
  maxSize?: number;
  allowedTypes?: string[];
}

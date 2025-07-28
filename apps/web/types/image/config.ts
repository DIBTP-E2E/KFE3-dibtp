export type ImageConfigType = 'product' | 'profile';

export interface ImageConfig {
  type: ImageConfigType;
  maxCount: number;
  maxSize: number; // bytes
  allowedTypes: readonly string[];
  storage: {
    bucket: string;
    pathPrefix: (userId: string) => string;
  };
  // Supabase transform options for different use cases
  transforms?: {
    thumbnail?: {
      width: number;
      height: number;
      resize?: 'cover' | 'contain' | 'fill';
      quality?: number;
    };
    preview?: {
      width: number;
      height: number;
      resize?: 'cover' | 'contain' | 'fill';
      quality?: number;
    };
    full?: {
      width?: number;
      height?: number;
      quality?: number;
    };
  };
}

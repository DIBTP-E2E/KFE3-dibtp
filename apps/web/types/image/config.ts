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
  transforms?: Record<
    string,
    {
      width?: number;
      height?: number;
      resize?: 'cover' | 'contain' | 'fill';
      quality?: number;
    }
  >;
}

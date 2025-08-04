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
}

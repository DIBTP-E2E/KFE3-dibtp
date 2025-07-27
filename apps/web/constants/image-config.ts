import { ImageConfig, ImageConfigType } from '@/types';

export const IMAGE_CONFIGS: Record<ImageConfigType, ImageConfig> = {
  product: {
    type: 'product',
    maxCount: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,
    storage: {
      bucket: 'product-images',
      pathPrefix: (userId: string) => `products/${userId}`,
    },
    transforms: {
      thumbnail: { width: 200, height: 200, resize: 'cover', quality: 85 },
      preview: { width: 800, height: 600, resize: 'contain', quality: 90 },
      full: { quality: 95 },
    },
  },
  profile: {
    type: 'profile',
    maxCount: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,
    storage: {
      bucket: 'profiles',
      pathPrefix: (userId: string) => `profiles/${userId}`,
    },
    transforms: {
      thumbnail: { width: 100, height: 100, resize: 'cover', quality: 90 },
      preview: { width: 400, height: 400, resize: 'cover', quality: 95 },
    },
  },
} as const;

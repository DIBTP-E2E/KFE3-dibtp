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
      bucket: 'profile-images',
      pathPrefix: (userId: string) => `profiles/${userId}`,
    },
    transforms: {
      sm: { width: 24, height: 24, resize: 'cover', quality: 90 },
      md: { width: 32, height: 32, resize: 'cover', quality: 90 },
      lg: { width: 44, height: 44, resize: 'cover', quality: 90 },
      xl: { width: 48, height: 48, resize: 'cover', quality: 90 },
      max: { width: 128, height: 128, resize: 'cover', quality: 90 },
    },
  },
} as const;

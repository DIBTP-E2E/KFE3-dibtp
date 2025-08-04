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
  },
} as const;

// 공통 Next.js Image 설정
export const NEXT_IMAGE_CONFIG = {
  priority: false,
} as const;

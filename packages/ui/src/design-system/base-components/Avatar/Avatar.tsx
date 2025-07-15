'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@ui/utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string; // 프로필 이미지 URL
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // 아바타 크기
  name?: string;
  priority?: boolean; // 이미지 로딩 우선순위
  onImageError?: () => void; // 이미지 로드 실패 시 콜백
}

// 크기별 스타일 상수
const AVATAR_SIZES = {
  sm: {
    container: 'size-6', // w-6 h-6 → size-6 (Tailwind v4)
    pixels: 24,
  },
  md: {
    container: 'size-8',
    pixels: 32,
  },
  lg: {
    container: 'size-11',
    pixels: 44,
  },
  xl: {
    container: 'size-12',
    pixels: 48,
  },
} as const;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', name, priority = false, onImageError, className, ...props }, ref) => {
    // Fallback 아바타 생성 함수
    const generateFallbackAvatar = (seedName: string) => {
      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seedName)}`;
    };

    // 이미지 소스 결정
    const imageSrc = src || generateFallbackAvatar(name || alt);
    const sizeConfig = AVATAR_SIZES[size];

    return (
      <div
        ref={ref}
        className={cn(
          // 기본 스타일
          'relative inline-flex shrink-0 overflow-hidden rounded-full',
          // 보더 스타일 (디자인 시스템 컬러 사용)
          'border border-border-base',
          // 크기
          sizeConfig.container,
          // 호버 효과 (상호작용 개선)
          'transition-all duration-200 hover:border-border-primary',
          className
        )}
        {...props}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={sizeConfig.pixels}
          height={sizeConfig.pixels}
          priority={priority}
          className="object-cover size-full"
          onError={onImageError}
          // 이미지 최적화 설정
          sizes={`${sizeConfig.pixels}px`}
          quality={85}
        />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

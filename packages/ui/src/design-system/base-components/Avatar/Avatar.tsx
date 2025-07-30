'use client';

import { forwardRef } from 'react';

import { cn } from '@ui/utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string; // 프로필 이미지 URL
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // 아바타 크기
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
  ({ src, alt, size = 'md', onImageError, className, ...props }, ref) => {
    const sizeConfig = AVATAR_SIZES[size];

    return (
      <figure
        ref={ref}
        className={cn(
          // 기본 스타일
          'relative inline-flex shrink-0 overflow-hidden rounded-full',
          // 보더 및 배경 스타일 (디자인 시스템 컬러 사용)
          'border border-border-base bg-bg-base',
          // 크기
          sizeConfig.container,
          // 호버 효과 (상호작용 개선)
          'transition-all duration-200 hover:border-border-primary',
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            width={sizeConfig.pixels}
            height={sizeConfig.pixels}
            className="object-cover size-full"
            onError={onImageError}
            sizes={`${sizeConfig.pixels}px`}
          />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 122 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_98_11527)">
              <ellipse cx="61" cy="60.5" rx="61" ry="60.5" fill="#DAE3EA" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M72.6189 48.9762C72.6189 55.3431 67.4193 60.5 60.9998 60.5C54.5803 60.5 49.3808 55.3431 49.3808 48.9762C49.3808 42.6093 54.5803 37.4524 60.9998 37.4524C67.4193 37.4524 72.6189 42.6093 72.6189 48.9762ZM37.7617 77.7857C37.7617 70.1224 53.2441 66.2619 60.9998 66.2619C68.7555 66.2619 84.2379 70.1224 84.2379 77.7857V80.6667C84.2379 82.2512 82.9308 83.5476 81.3331 83.5476H40.6665C39.0689 83.5476 37.7617 82.2512 37.7617 80.6667V77.7857Z"
                fill="#94A3B1"
              />
            </g>
            <defs>
              <clipPath id="clip0_98_11527">
                <rect width="122" height="121" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </figure>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

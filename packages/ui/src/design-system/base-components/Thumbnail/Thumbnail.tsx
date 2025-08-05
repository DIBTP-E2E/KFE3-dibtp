import { cn } from '@ui/utils/cn';
import { ComponentType } from 'react';

// 외부 이미지 컴포넌트용 인터페이스 (확장성)
export interface ThumbnailImageProps {
  src: string;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

export interface ThumbnailProps {
  imgUrl: string;
  alt?: string;
  aspectRatio?: 'square' | 'auto';
  rounded?: 'none' | 'sm' | 'xl' | 'full';
  // cls 방지용 속성
  clsWidth?: number;
  clsHeight?: number;
  /** 이미지 너비 (Tailwind 클래스) */
  displaySize?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  /** 확장성: 외부 이미지 컴포넌트 주입 (선택사항) */
  ImageComponent?: ComponentType<ThumbnailImageProps> | 'img';
}

const Thumbnail = ({
  imgUrl,
  alt,
  aspectRatio = 'square',
  rounded = 'xl',
  className,
  loading = 'lazy',
  clsWidth,
  clsHeight,
  displaySize,
  ImageComponent = 'img',
}: ThumbnailProps) => {
  const isSquare = aspectRatio === 'square';

  return (
    <figure
      className={cn(
        'relative overflow-hidden bg-bg-base',
        `rounded-${rounded}`,
        isSquare && 'h-0 pb-[100%]',
        !isSquare && 'h-auto',
        displaySize || 'w-full',
        className
      )}
    >
      <ImageComponent
        src={imgUrl}
        alt={alt}
        className={cn('object-cover size-full', isSquare && 'absolute inset-0')}
        loading={loading}
        width={clsWidth}
        height={clsHeight}
      />
    </figure>
  );
};

export default Thumbnail;

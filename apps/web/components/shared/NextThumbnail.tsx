'use client';

import { Thumbnail, ThumbnailProps, ThumbnailImageProps } from '@repo/ui/components';

import Image from 'next/image';

import { NEXT_IMAGE_CONFIG } from '@web/constants';

// Next.js Thumbnail wrapper - width/height 또는 fill 방식
const NextThumbnailImage = (
  props: ThumbnailImageProps & { fill?: boolean; quality?: number; priority?: boolean }
) => {
  const { src, alt, className, loading, width, height, fill, quality = 75, priority } = props;

  return (
    <Image
      {...NEXT_IMAGE_CONFIG}
      src={src}
      alt={alt || ''}
      className={className}
      priority={priority ?? loading === 'eager'}
      quality={quality}
      {...(fill ? { fill: true } : { width: width!, height: height! })}
    />
  );
};

export type NextThumbnailProps = Omit<ThumbnailProps, 'ImageComponent'> & {
  quality?: number;
  priority?: boolean;
};

const NextThumbnail = (props: NextThumbnailProps) => {
  const { width, height, quality, priority } = props;

  // 크기가 지정되지 않으면 fill 모드, 크기가 같으면 square
  const useFillMode = !width && !height;
  const isSquareAspect = useFillMode || width === height;

  const OptimizedImageComponent = (imageProps: ThumbnailImageProps) => (
    <NextThumbnailImage
      {...imageProps}
      width={width}
      height={height}
      fill={useFillMode}
      quality={quality}
      priority={priority}
    />
  );

  return (
    <Thumbnail
      {...props}
      aspectRatio={isSquareAspect ? 'square' : props.aspectRatio}
      ImageComponent={OptimizedImageComponent}
    />
  );
};

export default NextThumbnail;

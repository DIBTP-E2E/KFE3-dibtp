'use client';

import { Avatar, AvatarProps, AvatarImageProps } from '@repo/ui/components';

import Image from 'next/image';

import { NEXT_IMAGE_CONFIG } from '@web/constants';

// Next.js Avatar Image wrapper
const NextAvatarImage = (props: AvatarImageProps & { quality?: number; priority?: boolean }) => {
  const {
    src,
    alt,
    className,
    width,
    height,
    onError,
    sizes,
    quality = 70,
    priority = false,
  } = props;

  return (
    <Image
      {...NEXT_IMAGE_CONFIG}
      src={src}
      alt={alt}
      className={className}
      width={width || 0}
      height={height || 0}
      quality={quality}
      priority={priority}
      onError={onError}
      sizes={sizes}
    />
  );
};

export type NextAvatarProps = Omit<AvatarProps, 'ImageComponent'> & {
  quality?: number;
  priority?: boolean;
};

const NextAvatar = (props: NextAvatarProps) => {
  const { quality, priority, ...avatarProps } = props;

  const OptimizedAvatarImage = (imageProps: AvatarImageProps) => (
    <NextAvatarImage {...imageProps} quality={quality} priority={priority} />
  );

  return <Avatar {...avatarProps} ImageComponent={OptimizedAvatarImage} />;
};

export default NextAvatar;

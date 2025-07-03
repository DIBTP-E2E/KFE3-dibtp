import { cn } from '@/utils/cn';

export interface ThumbnailProps {
  imgUrl: string;
  aspectRatio?: 'square' | 'auto';
  rounded?: 'none' | 'sm' | 'xl' | 'full';
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
}

const Thumbnail = ({
  imgUrl,
  rounded = 'xl',
  aspectRatio = 'square',
  width,
  height,
  className,
  alt,
}: ThumbnailProps) => {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-xl bg-bg-base',
        `rounded-${rounded}`,
        aspectRatio === 'square' && 'h-0 pb-[100%]', // 1:1 비율
        aspectRatio === 'auto' && 'h-auto', // 자유 비율
        width ? width : 'w-full',
        className
      )}
    >
      <img
        src={imgUrl}
        alt={alt}
        className={cn(
          'w-full object-cover',
          aspectRatio === 'square' && 'absolute top-0 left-0 h-full', // 1:1일 때
          aspectRatio === 'auto' && 'h-auto', // 자유 비율일 때
          height && aspectRatio === 'auto' && height // 자유 비율 + height 지정
        )}
      />
    </figure>
  );
};

Thumbnail.displayName = 'Thumbnail';

export default Thumbnail;

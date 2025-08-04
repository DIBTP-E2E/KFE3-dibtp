import type { ProductStatus } from '@web/types';

import noImage from '@/assets/images/no-image.png';

import { ProductBadge, NextThumbnail } from '../shared';

interface ProductThumbProps {
  status: ProductStatus;
  imgUrl: string;
  title: string;
  width?: number;
  height?: number;
  containerWidth?: string;
  className?: string;
  isShowBadge?: boolean;
}

const ProductThumb = ({
  status,
  imgUrl,
  title,
  width,
  height,
  containerWidth,
  className,
  isShowBadge = true,
}: ProductThumbProps) => {
  return (
    <section className="relative">
      <NextThumbnail
        imgUrl={imgUrl ? imgUrl : noImage.src}
        alt={title}
        width={width}
        height={height}
        containerWidth={containerWidth}
        quality={80}
        className={className}
      />

      {isShowBadge && (
        <ProductBadge
          status={status}
          className="absolute top-[var(--space-xs)] left-[var(--space-xs)]"
        />
      )}
    </section>
  );
};

export default ProductThumb;

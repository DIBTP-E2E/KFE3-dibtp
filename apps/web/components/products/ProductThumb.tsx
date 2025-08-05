import noImage from '@web/assets/images/no-image.png';

import type { ProductStatus } from '@web/types';

import { ProductBadge, NextThumbnail } from '../shared';

interface ProductThumbProps {
  status: ProductStatus;
  imgUrl: string;
  title: string;
  clsWidth?: number;
  clsHeight?: number;
  displaySize?: string;
  className?: string;
  isShowBadge?: boolean;
}

const ProductThumb = ({
  status,
  imgUrl,
  title,
  clsWidth,
  clsHeight,
  displaySize,
  className,
  isShowBadge = true,
}: ProductThumbProps) => {
  return (
    <section className="relative">
      <NextThumbnail
        imgUrl={imgUrl ? imgUrl : noImage.src}
        alt={title}
        clsWidth={clsWidth}
        clsHeight={clsHeight}
        displaySize={displaySize}
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

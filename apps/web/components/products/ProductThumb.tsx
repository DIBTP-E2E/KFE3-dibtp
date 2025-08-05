import { Thumbnail } from '@repo/ui/components';

import noImage from '@web/assets/images/no-image.png';
import type { ProductStatus } from '@web/types';


import { ProductBadge } from '../shared';

interface ProductThumbProps {
  status: ProductStatus;
  imgUrl: string;
  title: string;
  width?: string;
  className?: string;
  isShowBadge?: boolean;
}

const ProductThumb = ({
  status,
  imgUrl,
  title,
  width,
  className,
  isShowBadge = true,
}: ProductThumbProps) => {
  return (
    <section className="relative">
      <Thumbnail
        imgUrl={imgUrl ? imgUrl : noImage.src}
        alt={title}
        width={width}
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

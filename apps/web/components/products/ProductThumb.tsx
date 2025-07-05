import { Thumbnail } from '@repo/ui/components';

import { ProductBadge } from '@/components/shared';

import noImage from '@/assets/images/no-image.png';

interface ProductThumbProps {
  imgUrl: string;
  name: string;
  width?: string;
  className?: string;
}

const ProductThumb = ({ imgUrl, name, width, className }: ProductThumbProps) => {
  return (
    <section className="relative">
      <Thumbnail
        imgUrl={imgUrl ? imgUrl : noImage.src}
        alt={name}
        width={width}
        className={className}
      />

      <ProductBadge
        variant="live"
        className="absolute top-[var(--space-xs)] left-[var(--space-xs)]"
      />
    </section>
  );
};

export default ProductThumb;

import { Thumbnail } from '@repo/ui/components';

import { ProductBadge } from '@/components/shared';

import noImage from '@/assets/images/no-image.png';

interface ProductThumbProps {
  imgUrl: string;
  name: string;
}

const ProductThumb = ({ imgUrl, name }: ProductThumbProps) => {
  return (
    <section className="relative">
      <Thumbnail imgUrl={imgUrl ? imgUrl : noImage.src} alt={name} width="100px" />

      <ProductBadge
        variant="live"
        className="absolute top-[var(--space-xs)] left-[var(--space-xs)]"
      />
    </section>
  );
};

export default ProductThumb;

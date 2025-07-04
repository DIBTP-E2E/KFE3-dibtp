import { Thumbnail } from '@repo/ui/components';

import { ProductBadge } from '@/components/shared';

import type { ProductBadgeStatus } from '@/types';

import noImage from '@/assets/images/no-image.png';

interface ProductThumbProps {
  status: ProductBadgeStatus;
  imgUrl: string;
  title: string;
  bidderUserId?: string; // 입찰 기능 완료시 필수값으로 변경 예정
  width?: string;
  className?: string;
}

const ProductThumb = ({ status, imgUrl, title, width, className }: ProductThumbProps) => {
  return (
    <section className="relative">
      <Thumbnail
        imgUrl={imgUrl ? imgUrl : noImage.src}
        alt={title}
        width={width}
        className={className}
      />

      <ProductBadge
        status={status}
        className="absolute top-[var(--space-xs)] left-[var(--space-xs)]"
      />
    </section>
  );
};

export default ProductThumb;

import { Badge } from '@repo/ui/components';

import { PRODUCT_STATUS, PRODUCT_STATUS_LABELS } from '@/constants';
import type { ProductStatus } from '@/types';
interface ProductBadgeProps {
  status: ProductStatus;
  className?: string;
}

const MAP = {
  [PRODUCT_STATUS.ACTIVE]: {
    color: 'primary',
    variant: 'fulled',
    label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.ACTIVE],
  },
  [PRODUCT_STATUS.SOLD]: {
    color: 'disabled',
    variant: 'fulled',
    label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.SOLD],
  },
  [PRODUCT_STATUS.CANCEL]: {
    color: 'disabled',
    variant: 'fulled',
    label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.CANCEL],
  },
} as const;

const ProductBadge = ({ status, className }: ProductBadgeProps) => {
  return (
    <Badge color={MAP[status].color} size="sm" variant={MAP[status].variant} className={className}>
      {MAP[status].label}
    </Badge>
  );
};

export default ProductBadge;

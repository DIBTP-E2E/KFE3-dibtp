import { Badge } from '@repo/ui/components';

import type { ProductStatus } from '@/types';
interface ProductBadgeProps {
  status: ProductStatus;
  className?: string;
}

const MAP = {
  READY: {
    color: 'primary',
    variant: 'inverted',
    label: '경매 전',
  },
  ACTIVE: {
    color: 'primary',
    variant: 'fulled',
    label: '경매 중',
  },
  SOLD: {
    // 낙찰 상태는 SOLD 에서 SUCCESS 로 변경 예정
    color: 'success',
    variant: 'fulled',
    label: '낙찰',
  },
  EXPIRED: {
    color: 'disabled',
    variant: 'fulled',
    label: '경매 종료',
  },
  CANCEL: {
    color: 'disabled',
    variant: 'fulled',
    label: '취소',
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

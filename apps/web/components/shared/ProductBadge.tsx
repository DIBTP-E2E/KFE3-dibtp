import { Badge } from '@repo/ui/components';

interface ProductBadgeProps {
  variant: 'ready' | 'live' | 'success' | 'end' | 'cancel';
}

const COLOR_MAP = {
  ready: 'primary',
  live: 'secondary',
  success: 'success',
  end: 'disabled',
  cancel: 'disabled',
} as const;

const STATE_MAP = {
  ready: '경매 전',
  live: '경매 중',
  success: '낙찰',
  end: '경매 종료',
  cancel: '취소',
} as const;

const ProductBadge = ({ variant }: ProductBadgeProps) => {
  return (
    <Badge color={COLOR_MAP[variant]} size="sm" variant="fulled">
      {STATE_MAP[variant]}
    </Badge>
  );
};

ProductBadge.displayName = 'ProductBadge';

export default ProductBadge;

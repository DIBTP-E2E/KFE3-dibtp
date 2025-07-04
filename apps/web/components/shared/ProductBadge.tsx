import { Badge } from '@repo/ui/components';

interface ProductBadgeProps {
  variant: 'ready' | 'live' | 'success' | 'end' | 'cancel';
  className?: string;
}

const COLOR_MAP = {
  ready: 'primary',
  live: 'primary',
  success: 'success',
  end: 'disabled',
  cancel: 'disabled',
} as const;

const VARIANT_MAP = {
  ready: 'inverted',
  live: 'fulled',
  success: 'fulled',
  end: 'fulled',
  cancel: 'fulled',
} as const;

const STATE_MAP = {
  ready: '경매 전',
  live: '경매 중',
  success: '낙찰',
  end: '경매 종료',
  cancel: '취소',
} as const;

const ProductBadge = ({ variant, className }: ProductBadgeProps) => {
  return (
    <Badge
      color={COLOR_MAP[variant]}
      size="sm"
      variant={VARIANT_MAP[variant]}
      className={className}
    >
      {STATE_MAP[variant]}
    </Badge>
  );
};

export default ProductBadge;

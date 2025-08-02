import { PRODUCT_STATUS } from '@web/constants';
import type { ProductStatus } from '@web/types';

interface SalesEmptyStateProps {
  status: ProductStatus;
}

const EMPTY_MESSAGES = {
  [PRODUCT_STATUS.ACTIVE]: '진행중인 경매가 없습니다.',
  [PRODUCT_STATUS.SOLD]: '낙찰된 상품이 없습니다.',
  [PRODUCT_STATUS.CANCEL]: '중지된 상품이 없습니다.',
} as const;

const SalesEmptyState = ({ status }: SalesEmptyStateProps) => {
  const message = EMPTY_MESSAGES[status] || '상품이 없습니다.';

  return <div className="text-center py-5xl text-text-info">{message}</div>;
};

export default SalesEmptyState;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 상세 - 경매 플랫폼',
  description: '상품 상세 정보를 확인하고 경매에 참여하세요.',
};

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProductDetailLayout;

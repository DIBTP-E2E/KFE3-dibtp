import type { Metadata } from 'next';

import { TopNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '상품 수정 - 경매 플랫폼',
  description: '등록된 상품 정보를 수정하세요.',
};

const ProductEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="상품 수정"
        showBackButton
        showTitle
        showSearchButton={false}
        showAlarmButton={false}
      />
      <PageContainer className="py-lg">{children}</PageContainer>
    </div>
  );
};

export default ProductEditLayout;

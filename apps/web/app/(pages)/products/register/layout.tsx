import type { Metadata } from 'next';

import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '상품 목록 - 경매 플랫폼',
  description: '다양한 중고 상품들을 경매로 만나보세요.',
};

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation title="출품하기" showBackButton={true} />
      <PageContainer className="flex-1 py-lg" hasTopNavigation={true} hasBottomNavigation={true}>
        {children}
      </PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default ProductsLayout;

import { TopNavigation, BottomNavigation, PageContainer } from '@web/components/layout';
import { ProductListWithSuspense } from '@web/components/products';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="홈"
        showTitle={false}
        showBackButton={false}
        showRegion
        showSearchButton
        showAlarmButton
      />

      <PageContainer className="py-lg">
        <h2 className="sr-only">경매 상품 리스트</h2>
        <ProductListWithSuspense />
      </PageContainer>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;

import type { Metadata } from 'next';

import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '홈 - 경매 플랫폼',
  description: '지역 기반 중고 물품 경매 플랫폼 홈페이지',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="홈"
        showTitle={false}
        showBackButton={false}
        region="강남구 역삼동"
        showRegion
        showSearchButton
        showAlarmButton
      />

      <PageContainer className="py-lg">{children}</PageContainer>

      <BottomNavigation />
    </div>
  );
};

export default MainLayout;

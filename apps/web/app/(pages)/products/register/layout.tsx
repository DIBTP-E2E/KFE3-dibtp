import type { Metadata } from 'next';

import { TopNavigation, PageContainer } from '@web/components/layout';

export const metadata: Metadata = {
  title: '출품하기 | DDIP',
  description:
    '새로운 상품을 경매에 출품하세요. 시작가, 최저가, 거래 위치를 설정하고 상품을 등록할 수 있습니다.',
};

const ProductRegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="출품하기"
        showBackButton
        showTitle
        showSearchButton={false}
        showAlarmButton={false}
      />
      <PageContainer className="py-lg">{children}</PageContainer>
    </div>
  );
};

export default ProductRegisterLayout;

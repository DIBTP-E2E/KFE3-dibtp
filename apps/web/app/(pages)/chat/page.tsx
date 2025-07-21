import type { Metadata } from 'next';

import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '채팅 목록 - 경매 플랫폼',
  description: '진행 중인 채팅 목록을 확인하세요.',
};

const ChatListPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="채팅"
        showTitle
        showAlarmButton
        showBackButton={false}
        showSearchButton={false}
        showRegion={false}
      />
      <PageContainer className="py-lg">준비중입니다!</PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default ChatListPage;

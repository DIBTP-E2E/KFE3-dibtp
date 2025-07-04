import type { Metadata } from 'next';

import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '채팅 목록 - 경매 플랫폼',
  description: '진행 중인 채팅 목록을 확인하세요.',
};

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation title="채팅" />
      <PageContainer className="flex-1 py-lg" hasTopNavigation={true} hasBottomNavigation={true}>
        {children}
      </PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default ChatLayout;

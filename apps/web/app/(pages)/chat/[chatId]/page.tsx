import type { Metadata } from 'next';

import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

export const metadata: Metadata = {
  title: '채팅방 - 경매 플랫폼',
  description: '실시간 채팅으로 거래를 진행하세요.',
};

interface ChatRoomPageParams {
  params: Promise<{ chatId: string }>;
}

// 채팅 방 페이지
const ChatRoomPage = async ({ params }: ChatRoomPageParams) => {
  const { chatId } = await params;

  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="상품 등록한 User의 닉네임"
        showTitle
        showBackButton
        showAlarmButton={false}
        showSearchButton={false}
        showRegion={false}
      />
      <PageContainer className="py-lg">chatId: {chatId} 준비중입니다!</PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default ChatRoomPage;

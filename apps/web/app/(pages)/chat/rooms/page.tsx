import type { Metadata } from 'next';

import { ChatList } from '@web/components/chat/ChatList';
import { TopNavigation, BottomNavigation, PageContainer } from '@web/components/layout';

interface ChatListPageParmas {
  searchParams: Promise<{ productId?: string }>;
}

export const metadata: Metadata = {
  title: '채팅 목록 - 경매 플랫폼',
  description: '진행 중인 채팅 목록을 확인하세요.',
};

const ChatListPage = async ({ searchParams }: ChatListPageParmas) => {
  const { productId: productIdParam } = await searchParams;
  const productId = productIdParam ? parseInt(productIdParam, 10) : undefined;

  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title={productId ? '상품 채팅' : '채팅'}
        showTitle
        showAlarmButton
        showBackButton={!!productId}
        showSearchButton={false}
        showRegion={false}
      />
      <PageContainer className="py-lg">
        <ChatList productId={productId} />
      </PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default ChatListPage;

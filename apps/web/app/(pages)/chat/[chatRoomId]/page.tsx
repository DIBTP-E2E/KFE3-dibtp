import type { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { ChatRoom } from '@web/components/chat/ChatRoom';
import { TopNavigation } from '@web/components/layout';
import { PAGE_ROUTES } from '@web/constants';
import { getChatRoomDetail } from '@web/services/chat/server';
import { getAuthenticatedUser } from '@web/utils/auth/server';

export const metadata: Metadata = {
  title: '채팅방 - 경매 플랫폼',
  description: '실시간 채팅으로 거래를 진행하세요.',
};

interface ChatRoomPageParams {
  params: Promise<{ chatRoomId: string }>;
}

const ChatRoomPage = async ({ params }: ChatRoomPageParams) => {
  const { chatRoomId } = await params;

  // 사용자 인증 확인
  const authResult = await getAuthenticatedUser();

  // 채팅방 상세 정보 조회
  if (!authResult.userId) {
    throw new Error('User ID is missing');
  }

  const { data, error } = await getChatRoomDetail({
    chat_room_id: chatRoomId,
    user_id: authResult.userId,
  });

  // 채팅방이 존재하지 않거나 접근 권한이 없는 경우
  if (error || !data?.chatRoom) {
    redirect(PAGE_ROUTES.CHAT.LIST);
  }

  const { chatRoom } = data;
  const isSellerView = chatRoom.seller_user_id === authResult.userId;
  const otherUser = isSellerView ? chatRoom.buyer_profile : chatRoom.seller_profile;

  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title={otherUser?.nickname || '익명'}
        showTitle
        showBackButton
        showAlarmButton={false}
        showSearchButton={false}
        showRegion={false}
      />
      <main className="flex-1 overflow-hidden">
        <ChatRoom chatRoom={chatRoom} currentUserId={authResult.userId} />
      </main>
    </div>
  );
};

export default ChatRoomPage;

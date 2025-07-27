'use client';

import { Button } from '@repo/ui/components';

import { useAppNavigation, useMyInfo } from '@web/hooks';
import { useChatRooms } from '@web/hooks/chat/useChatRooms';
import { useCreateChatRoom } from '@web/hooks/chat/useCreateChatRoom';

interface ChatButtonProps {
  productId: number;
  sellerUserId: string;
}

const ChatButton = ({ productId, sellerUserId }: ChatButtonProps) => {
  const { userId: myUserId } = useMyInfo();
  const { goToChatRoom, goToProductChatList } = useAppNavigation();

  const isMyProduct = myUserId === sellerUserId;

  // 판매자일 때 해당 상품의 채팅방 목록 조회 (버튼 클릭 시에만 조회)
  const { refetch: fetchProductChatRooms } = useChatRooms({
    filter: { product_id: productId },
    enabled: false, // 자동 조회 비활성화
  });

  const { mutate, isPending } = useCreateChatRoom({
    onSuccess: (data) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('채팅방 생성 및 입장 성공:', data);
        // data.chatRoom - 생성된 채팅방 정보
        // data.isExisting - 기존 채팅방인지 여부
      }

      goToChatRoom(data.chatRoom.chat_room_id);
    },
    onError: (error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('채팅방 생성 및 입장 실패:', error.message);
      }
    },
  });

  const handleCreateChatRoom = () => {
    mutate({
      product_id: productId,
      seller_user_id: sellerUserId,
      buyer_user_id: myUserId,
    });
  };

  const handleSellerChatAction = async () => {
    // 버튼 클릭 시에만 채팅방 목록 조회
    const result = await fetchProductChatRooms();
    const productChatRooms = result.data?.chatRooms || [];

    if (productChatRooms.length === 0) {
      // 채팅방이 없는 경우
      alert('채팅한 이웃이 없어요');
      return;
    }

    if (productChatRooms.length === 1) {
      // 채팅방이 하나뿐이면 바로 입장
      const chatRoomId = productChatRooms[0]?.chat_room_id;

      if (chatRoomId) {
        goToChatRoom(chatRoomId);
      }

      return;
    }

    if (productChatRooms.length > 1) {
      // 채팅방이 여러개면 상품별 채팅 목록으로 이동
      goToProductChatList(String(productId));
    }
  };

  return (
    <Button
      onClick={isMyProduct ? handleSellerChatAction : handleCreateChatRoom}
      disabled={isPending}
      size="sm"
      isFullWidth={false}
    >
      {isMyProduct ? '대화중인 채팅' : '채팅하기'}
    </Button>
  );
};

export default ChatButton;

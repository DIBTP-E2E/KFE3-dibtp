'use client';

import { Button } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';

import { USER_REGION_QUERY_KEY } from '@web/constants';
import { useAppNavigation } from '@web/hooks';
import { useCreateChatRoom } from '@web/hooks/chat/useCreateChatRoom';
import { fetchUserRegion } from '@web/services/user/client';
import type { UserRegion } from '@web/types';

interface ChatButtonProps {
  productId: number;
  sellerUserId: string;
}

const ChatButton = ({ productId, sellerUserId }: ChatButtonProps) => {
  const { data } = useQuery<UserRegion>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  const { goToChatRoom } = useAppNavigation();

  const createChatRoomMutation = useCreateChatRoom({
    onSuccess: (data) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('채팅방 생성 성공:', data);
        // data.chatRoom - 생성된 채팅방 정보
        // data.isExisting - 기존 채팅방인지 여부
      }

      goToChatRoom(data.chatRoom.chat_room_id);
    },
    onError: (error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('채팅방 생성 실패:', error.message);
      }
    },
  });

  const handleCreateChatRoom = () => {
    createChatRoomMutation.mutate({
      product_id: productId,
      seller_user_id: sellerUserId,
      buyer_user_id: data?.userId ?? '',
    });
  };

  return (
    <Button
      onClick={handleCreateChatRoom}
      disabled={createChatRoomMutation.isPending}
      size="sm"
      isFullWidth={false}
    >
      채팅하기
    </Button>
  );
};

export default ChatButton;

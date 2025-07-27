'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { useMyInfo } from '@web/hooks';
import { fetchChatList } from '@web/services/chat/client/fetchChatList';

import type { GetChatRoomsAPIRequest, ChatListFilter } from '@web/types/chat';

interface UseChatRoomsOptions {
  filter?: ChatListFilter;
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

/**
 * 채팅방 목록을 조회하는 React Query 훅
 */
export const useChatRooms = ({
  filter = {},
  limit = 20,
  offset = 0,
  enabled = true,
}: UseChatRoomsOptions) => {
  const { userId } = useMyInfo();
  const request: GetChatRoomsAPIRequest = {
    user_id: userId,
    filter,
    limit,
    offset,
  };

  return useQuery({
    queryKey: QUERY_KEY.CHAT_ROOM.LIST(request),
    queryFn: async () => {
      const response = await fetchChatList(request);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: enabled && !!userId,
    staleTime: 30 * 1000, // 30초
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000, // 1분마다 폴링
  });
};

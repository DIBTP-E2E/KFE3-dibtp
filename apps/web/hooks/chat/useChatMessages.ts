'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { fetchMessages } from '@web/services/chat/client';
import type { GetMessagesAPIRequest, MessagePaginationOptions } from '@web/types/chat';

interface UseChatMessagesOptions {
  chatRoomId: string;
  userId: string;
  pagination?: Omit<MessagePaginationOptions, 'before' | 'after'>;
  enabled?: boolean;
}

/**
 * 채팅 메시지 목록을 조회하는 React Query 무한 스크롤 훅
 */
export const useChatMessages = ({
  chatRoomId,
  userId,
  pagination = {},
  enabled = true,
}: UseChatMessagesOptions) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.CHAT_ROOM.MESSAGES(chatRoomId),
    queryFn: async ({ pageParam }) => {
      const request: GetMessagesAPIRequest = {
        chat_room_id: chatRoomId,
        user_id: userId,
        pagination: {
          ...pagination,
          before: pageParam,
        },
      };

      const response = await fetchMessages(request);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage.prevCursor : undefined;
    },
    initialPageParam: undefined as string | undefined,
    enabled: enabled && !!chatRoomId && !!userId,
    staleTime: 10 * 1000, // 10초
    refetchOnWindowFocus: false,
    // 실시간 메시지는 subscription으로 처리하므로 폴링 비활성화
    refetchInterval: false,
  });
};

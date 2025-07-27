'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { markMessagesAsRead } from '@web/services/chat/client';
import type { MarkMessagesAsReadAPIRequest } from '@web/types/chat';

interface UseMarkMessagesAsReadOptions {
  chatRoomId: string;
  onSuccess?: (data: { updatedCount: number }) => void;
  onError?: (error: Error) => void;
}

/**
 * 메시지 읽음 처리를 위한 React Query Mutation 훅
 */
export const useMarkMessagesAsRead = ({
  chatRoomId,
  onSuccess,
  onError,
}: UseMarkMessagesAsReadOptions) => {
  const queryClient = useQueryClient();
  const messageQueryKey = ['chat', 'messages', chatRoomId];

  return useMutation({
    mutationFn: async (request: MarkMessagesAsReadAPIRequest) => {
      const response = await markMessagesAsRead(request);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },

    // 옵티미스틱 업데이트
    onMutate: async (variables: MarkMessagesAsReadAPIRequest) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.CHAT_ROOM.MESSAGES(chatRoomId) });

      // 이전 데이터 저장
      const previousMessages = queryClient.getQueryData(messageQueryKey);

      // 옵티미스틱 업데이트: 읽지 않은 메시지들을 읽음으로 표시
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          messages: page.messages.map((msg: any) => {
            // 자신이 보낸 메시지가 아니고 읽지 않은 메시지면 읽음으로 변경
            if (msg.sender_user_id !== variables.user_id && !msg.is_read) {
              // 특정 메시지 ID들이 지정된 경우 해당 메시지만
              if (variables.message_ids) {
                return variables.message_ids.includes(msg.chat_message_id)
                  ? { ...msg, is_read: true }
                  : msg;
              }
              // 지정되지 않은 경우 모든 읽지 않은 메시지
              return { ...msg, is_read: true };
            }
            return msg;
          }),
        }));

        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousMessages };
    },

    onSuccess: (data) => {
      // 채팅방 목록의 읽지 않은 메시지 수 업데이트
      queryClient.invalidateQueries({
        queryKey: ['chat', 'rooms'],
      });

      onSuccess?.(data);
    },

    // 실패 시 롤백
    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(messageQueryKey, context.previousMessages);
      }

      onError?.(error as Error);
    },
  });
};

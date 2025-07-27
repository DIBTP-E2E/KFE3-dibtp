'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { sendMessage } from '@web/services/chat/client';
import type { SendMessageAPIRequest, ChatMessage, OptimisticMessage } from '@web/types/chat';

interface UseSendMessageOptions {
  chatRoomId: string;
  onSuccess?: (data: { message: ChatMessage }) => void;
  onError?: (error: Error) => void;
}

/**
 * 메시지 전송을 위한 React Query Mutation 훅
 */
export const useSendMessage = ({ chatRoomId, onSuccess, onError }: UseSendMessageOptions) => {
  const queryClient = useQueryClient();
  const messageQueryKey = QUERY_KEY.CHAT_ROOM.MESSAGES(chatRoomId);

  return useMutation({
    mutationFn: async (payload: SendMessageAPIRequest) => {
      const response = await sendMessage(payload);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },

    // 옵티미스틱 업데이트
    onMutate: async (variables: SendMessageAPIRequest) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: messageQueryKey });

      // 이전 데이터 저장
      const previousMessages = queryClient.getQueryData(messageQueryKey);

      // 옵티미스틱 메시지 생성
      const optimisticMessage: OptimisticMessage = {
        chat_message_id: Date.now(), // 임시 ID
        chat_room_id: variables.chat_room_id,
        message: variables.message,
        sender_user_id: variables.sender_user_id,
        created_at: new Date().toISOString(),
        is_read: false,
        status: 'sending',
        isOptimistic: true,
        tempId: `temp-${Date.now()}`,
      };

      // 옵티미스틱 업데이트 적용
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        // 무한 쿼리 데이터 구조에 맞게 업데이트
        const newPages = [...old.pages];
        if (newPages.length > 0) {
          const firstPage = { ...newPages[0] };
          firstPage.messages = [...firstPage.messages, optimisticMessage];
          newPages[0] = firstPage;
        }

        return {
          ...old,
          pages: newPages,
        };
      });

      // 컨텍스트 반환 (롤백용)
      return { previousMessages, optimisticMessage };
    },

    // 성공 시
    onSuccess: (data, variables, context) => {
      // 옵티미스틱 메시지를 실제 메시지로 교체
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          messages: page.messages.map((msg: any) =>
            msg.tempId === context?.optimisticMessage.tempId
              ? { ...data.message, status: 'sent' }
              : msg
          ),
        }));

        return {
          ...old,
          pages: newPages,
        };
      });

      // 채팅방 목록 무효화 (마지막 메시지 업데이트)
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

      // 옵티미스틱 메시지 상태를 실패로 변경
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          messages: page.messages.map((msg: any) =>
            msg.tempId === context?.optimisticMessage.tempId ? { ...msg, status: 'failed' } : msg
          ),
        }));

        return {
          ...old,
          pages: newPages,
        };
      });

      onError?.(error as Error);
    },
  });
};

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CHAT_ROOM_QUERY_KEY } from '@web/constants';
import { useMyInfo } from '@web/hooks';
import { createChatRoom } from '@web/services/chat/client/createChatRoom';

import type { CreateChatRoomPayload, ChatRoom } from '@web/types';

interface UseCreateChatRoomOptions {
  onSuccess?: (data: { chatRoom: ChatRoom; isExisting: boolean }) => void;
  onError?: (error: Error) => void;
}

/**
 * 채팅방 생성을 위한 React Query Mutation 훅
 */
export const useCreateChatRoom = ({ onSuccess, onError }: UseCreateChatRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { userId } = useMyInfo();

  return useMutation({
    mutationFn: async (payload: CreateChatRoomPayload) => {
      const response = await createChatRoom(payload);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },

    onSuccess: (data) => {
      // 채팅방 목록 무효화하여 새로운 채팅방 반영
      queryClient.invalidateQueries({
        queryKey: CHAT_ROOM_QUERY_KEY.LIST_ALL(userId),
      });

      onSuccess?.(data);
    },

    onError: (error) => {
      onError?.(error as Error);
    },
  });
};

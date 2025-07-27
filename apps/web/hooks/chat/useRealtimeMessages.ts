'use client';

import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { supabaseClient } from '@web/lib/supabase/client';
import type { ChatMessage, ChatMessageEvent } from '@web/types/chat';

interface UseRealtimeMessagesOptions {
  chatRoomId: string;
  userId: string;
  enabled?: boolean;
}

/**
 * 실시간 메시지 구독을 위한 훅
 */
export const useRealtimeMessages = ({
  chatRoomId,
  userId,
  enabled = true,
}: UseRealtimeMessagesOptions) => {
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);
  const messageQueryKey = QUERY_KEY.CHAT_ROOM.MESSAGES(chatRoomId);

  useEffect(() => {
    if (!enabled || !chatRoomId || !userId) return;

    const supabase = supabaseClient;

    // 채널 생성 (채팅방별로 고유한 채널)
    const channel = supabase.channel(`chat-messages-${chatRoomId}`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `chatRoomId=eq.${chatRoomId}`,
      },
      (payload: any) => {
        const { eventType, new: newMessage, old: oldMessage } = payload as ChatMessageEvent;

        switch (eventType) {
          case 'INSERT':
            handleNewMessage(newMessage);
            break;
          case 'UPDATE':
            handleMessageUpdate(newMessage);
            break;
          case 'DELETE':
            handleMessageDelete(oldMessage);
            break;
        }
      }
    );

    // 구독 시작
    channel.subscribe((status: string) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscribed to chat-messages-${chatRoomId}`);
      } else if (status === 'CHANNEL_ERROR') {
        console.error(`Error subscribing to chat-messages-${chatRoomId}`);
      }
    });

    channelRef.current = channel;

    // 새 메시지 처리
    const handleNewMessage = (message: ChatMessage) => {
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        // 이미 존재하는 메시지인지 확인 (옵티미스틱 업데이트와 중복 방지)
        const messageExists = old.pages.some((page: any) =>
          page.messages.some(
            (msg: any) => msg.chat_message_id === message.chat_message_id || msg.tempId // 옵티미스틱 메시지 제거
          )
        );

        if (messageExists) {
          // 옵티미스틱 메시지를 실제 메시지로 교체
          const newPages = old.pages.map((page: any) => ({
            ...page,
            messages: page.messages.map((msg: any) =>
              msg.tempId && msg.message === message.message ? { ...message, status: 'sent' } : msg
            ),
          }));

          return {
            ...old,
            pages: newPages,
          };
        } else {
          // 새 메시지 추가
          const newPages = [...old.pages];
          if (newPages.length > 0) {
            const firstPage = { ...newPages[0] };
            firstPage.messages = [...firstPage.messages, message];
            newPages[0] = firstPage;
          }

          return {
            ...old,
            pages: newPages,
          };
        }
      });

      // 채팅방 목록 업데이트 (마지막 메시지)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.CHAT_ROOM.LIST({ user_id: userId }),
      });
    };

    // 메시지 업데이트 처리 (읽음 상태 등)
    const handleMessageUpdate = (message: ChatMessage) => {
      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          messages: page.messages.map((msg: any) =>
            msg.chat_message_id === message.chat_message_id ? { ...msg, ...message } : msg
          ),
        }));

        return {
          ...old,
          pages: newPages,
        };
      });
    };

    // 메시지 삭제 처리
    const handleMessageDelete = (message: ChatMessage | null) => {
      if (!message) return;

      queryClient.setQueryData(messageQueryKey, (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          messages: page.messages.filter(
            (msg: any) => msg.chat_message_id !== message.chat_message_id
          ),
        }));

        return {
          ...old,
          pages: newPages,
        };
      });
    };

    // 정리 함수
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [chatRoomId, userId, enabled, queryClient, messageQueryKey]);

  // 채널 상태 반환
  return {
    isConnected: channelRef.current?.state === 'joined',
    channel: channelRef.current,
  };
};

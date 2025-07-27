'use client';

import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@web/constants';
import { useMyInfo } from '@web/hooks';
import type { chat_rooms } from '@web/lib/prisma/generated/prisma';
import { supabaseClient } from '@web/lib/supabase/client';

interface UseRealtimeChatRoomsListOptions {
  enabled?: boolean;
}

/**
 * 실시간 채팅방 목록 구독을 위한 훅
 *
 * @description 채팅방 목록(chat_rooms 테이블)의 변경사항만 실시간으로 구독합니다.
 * 메시지는 구독하지 않으므로 채팅방 목록 페이지에서 사용하기 적합합니다.
 */
export const useRealtimeChatRoomsList = ({
  enabled = true,
}: UseRealtimeChatRoomsListOptions = {}) => {
  const { userId } = useMyInfo();
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabaseClient.channel> | null>(null);
  const roomsQueryKey = QUERY_KEY.CHAT_ROOM.LIST({ user_id: userId });

  useEffect(() => {
    if (!enabled || !userId) return;

    const supabase = supabaseClient;

    // 채널 생성 (사용자별로 고유한 채널)
    const channel = supabase.channel(`chat-rooms-${userId}`).on(
      'postgres_changes' as any,
      {
        event: '*',
        schema: 'public',
        table: 'chat_rooms',
        filter: `or(buyer_user_id.eq.${userId},seller_user_id.eq.${userId})`,
      },
      (payload: any) => {
        const { eventType, new: newRoom, old: oldRoom } = payload;

        switch (eventType) {
          case 'INSERT':
            if (newRoom) handleNewChatRoom(newRoom);
            break;
          case 'UPDATE':
            if (newRoom) handleChatRoomUpdate(newRoom);
            break;
          case 'DELETE':
            if (oldRoom) handleChatRoomDelete(oldRoom);
            break;
        }
      }
    );

    // 구독 시작
    channel.subscribe((status: string) => {
      if (process.env.NODE_ENV === 'development') {
        if (status === 'SUBSCRIBED') {
          // eslint-disable-next-line no-console
          console.log(`Subscribed to chat-rooms-${userId}`);
        } else if (status === 'CHANNEL_ERROR') {
          // eslint-disable-next-line no-console
          console.error(`Error subscribing to chat-rooms-${userId}`);
        }
      }
    });

    channelRef.current = channel;

    // 새 채팅방 처리
    const handleNewChatRoom = (_room: chat_rooms) => {
      // 채팅방 목록 무효화하여 새로운 데이터 가져오기
      queryClient.invalidateQueries({
        queryKey: roomsQueryKey,
      });
    };

    // 채팅방 업데이트 처리 (마지막 업데이트 시간 등)
    const handleChatRoomUpdate = (room: chat_rooms) => {
      queryClient.setQueryData(roomsQueryKey, (old: unknown) => {
        const oldData = old as {
          chatRooms?: Array<{ chat_room_id: string; [key: string]: unknown }>;
        };
        if (!oldData?.chatRooms) return old;

        const updatedChatRooms = oldData.chatRooms.map((chatRoom) =>
          chatRoom.chat_room_id === room.chat_room_id ? { ...chatRoom, ...room } : chatRoom
        );

        // 업데이트된 채팅방을 최상단으로 이동 (최신 업데이트 순)
        const updatedRoom = updatedChatRooms.find((cr) => cr.chat_room_id === room.chat_room_id);
        const otherRooms = updatedChatRooms.filter((cr) => cr.chat_room_id !== room.chat_room_id);

        return {
          ...oldData,
          chatRooms: updatedRoom ? [updatedRoom, ...otherRooms] : updatedChatRooms,
        };
      });
    };

    // 채팅방 삭제 처리
    const handleChatRoomDelete = (room: chat_rooms) => {
      queryClient.setQueryData(roomsQueryKey, (old: unknown) => {
        const oldData = old as {
          chatRooms?: Array<{ chat_room_id: string; [key: string]: unknown }>;
          totalCount?: number;
        };
        if (!oldData?.chatRooms) return old;

        return {
          ...oldData,
          chatRooms: oldData.chatRooms.filter(
            (chatRoom) => chatRoom.chat_room_id !== room.chat_room_id
          ),
          totalCount: Math.max(0, (oldData.totalCount || 1) - 1),
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
  }, [userId, enabled, queryClient, roomsQueryKey]);

  // 채널 상태 반환
  return {
    isConnected: channelRef.current?.state === 'joined',
    channel: channelRef.current,
  };
};

import type { ApiResponse } from '@web/types/common';

import type { Tables } from '@web/types/lib/supabase-type';

// 기본 채팅 테이블 타입들
export type ChatRoom = Tables<'chat_rooms'>;
export type ChatMessage = Tables<'chat_messages'>;

// 채팅방 생성을 위한 타입
export interface CreateChatRoomPayload {
  product_id: number;
  buyer_user_id: string;
  seller_user_id: string;
}

// 메시지 전송을 위한 타입
export interface SendMessagePayload {
  chat_room_id: string;
  message: string;
  sender_user_id: string;
}

// 확장된 채팅방 정보 (조인된 데이터 포함)
export type ChatRoomWithDetails = ChatRoom & {
  buyer_profile: {
    nickname: string;
    profile_image: string | null;
  };
  seller_profile: {
    nickname: string;
    profile_image: string | null;
  };
  product: {
    title: string;
    current_price: number;
    status: string;
  };
  last_message?: {
    message: string;
    created_at: string;
    sender_user_id: string;
  };
  unread_count?: number;
};

// 확장된 메시지 정보 (발신자 정보 포함)
export type ChatMessageWithSender = ChatMessage & {
  sender: {
    nickname: string;
    profile_image: string | null;
  };
};

// 메시지 상태
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

// 옵티미스틱 업데이트를 위한 임시 메시지 타입
export interface OptimisticMessage {
  chat_message_id: number;
  chat_room_id: string;
  message: string;
  sender_user_id: string;
  created_at: string;
  is_read: boolean;
  status: MessageStatus;
  isOptimistic: true;
  tempId: string;
}

// 실시간 구독 이벤트 타입
export interface ChatMessageEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: ChatMessage;
  old: ChatMessage | null;
}

export interface ChatRoomEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: ChatRoom;
  old: ChatRoom | null;
}

// 채팅 목록 필터링 옵션
export interface ChatListFilter {
  product_id?: number;
  status?: 'all' | 'unread' | 'active';
  sortBy?: 'last_message' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}

// 메시지 페이지네이션 옵션
export interface MessagePaginationOptions {
  limit?: number;
  before?: string; // cursor (created_at)
  after?: string; // cursor (created_at)
}

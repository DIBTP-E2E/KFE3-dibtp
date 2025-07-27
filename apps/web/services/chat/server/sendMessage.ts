import { prisma } from '@web/lib/prisma';
import type { SendMessageAPIRequest, SendMessageAPIResponse } from '@web/types/chat';

/**
 * 메시지를 전송하는 서비스 함수
 */
export const sendMessage = async (
  payload: SendMessageAPIRequest
): Promise<SendMessageAPIResponse> => {
  try {
    const { chat_room_id: chatRoomId, message, sender_user_id: senderUserId } = payload;

    // Prisma를 사용한 메시지 삽입
    const newMessage = await prisma.chat_messages.create({
      data: {
        chat_room_id: chatRoomId,
        message,
        sender_user_id: senderUserId,
        is_read: false,
      },
    });

    // 채팅방 업데이트 (마지막 업데이트 시간)
    await prisma.chat_rooms.update({
      where: { chat_room_id: chatRoomId },
      data: { updated_at: new Date() },
    });

    return {
      data: {
        message: {
          chat_message_id: Number(newMessage.chat_message_id),
          chat_room_id: newMessage.chat_room_id,
          message: newMessage.message,
          sender_user_id: newMessage.sender_user_id,
          is_read: newMessage.is_read,
          created_at: newMessage.created_at.toISOString(),
        },
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 전송 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '메시지 전송에 실패했습니다.',
        code: 'DATABASE_ERROR',
      },
    };
  }
};

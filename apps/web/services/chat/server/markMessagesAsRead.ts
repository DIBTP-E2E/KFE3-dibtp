import { prisma } from '@web/lib/prisma';
import type { MarkMessagesAsReadAPIRequest, MarkMessagesAsReadAPIResponse } from '@web/types/chat';

/**
 * 메시지를 읽음 처리하는 서비스 함수
 */
export const markMessagesAsRead = async (
  request: MarkMessagesAsReadAPIRequest
): Promise<MarkMessagesAsReadAPIResponse> => {
  try {
    const { chat_room_id: chatRoomId, user_id: userId, message_ids: messageIds } = request;

    // Prisma where 조건 구성
    const whereCondition: {
      chat_room_id: string;
      sender_user_id: { not: string };
      is_read: boolean;
      chat_message_id?: { in: number[] };
    } = {
      chat_room_id: chatRoomId,
      sender_user_id: {
        not: userId, // 자신이 보낸 메시지는 제외
      },
      is_read: false, // 읽지 않은 메시지만
    };

    // 특정 메시지들만 읽음 처리
    if (messageIds && messageIds.length > 0) {
      whereCondition.chat_message_id = {
        in: messageIds,
      };
    }

    // Prisma를 사용한 메시지 읽음 처리
    const result = await prisma.chat_messages.updateMany({
      where: whereCondition,
      data: {
        is_read: true,
      },
    });

    return {
      data: {
        updatedCount: result.count,
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 읽음 처리 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '메시지 읽음 처리에 실패했습니다.',
        code: 'DATABASE_ERROR',
      },
    };
  }
};

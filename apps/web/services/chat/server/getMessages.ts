import { prisma } from '@web/lib/prisma';
import type {
  GetMessagesAPIRequest,
  GetMessagesAPIResponse,
  ChatMessageWithSender,
} from '@web/types/chat';

/**
 * 채팅방의 메시지 목록을 조회하는 서비스 함수
 */
export const getMessages = async (
  request: GetMessagesAPIRequest
): Promise<GetMessagesAPIResponse> => {
  try {
    const { chat_room_id: chatRoomId, pagination = {} } = request;
    const { limit = 50, before, after } = pagination;

    // 날짜 필터 조건 생성
    const dateFilter: any = {};
    if (before) {
      dateFilter.lt = new Date(before);
    }
    if (after) {
      dateFilter.gt = new Date(after);
    }

    // Prisma를 사용한 메시지 목록 조회 (발신자 정보 포함)
    const messages = await prisma.chat_messages.findMany({
      where: {
        chat_room_id: chatRoomId,
        ...(Object.keys(dateFilter).length > 0 && { created_at: dateFilter }),
      },
      include: {
        users: {
          select: {
            nickname: true,
            profile_image: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit + 1, // +1로 hasMore 판단
    });

    // hasMore 판단 및 실제 데이터 분리
    const hasMore = messages.length > limit;
    const actualMessages = hasMore ? messages.slice(0, -1) : messages;

    // 시간순으로 정렬 (오래된 것부터) 및 타입 변환
    const sortedMessages: ChatMessageWithSender[] = actualMessages.reverse().map((message) => ({
      chat_message_id: Number(message.chat_message_id),
      chat_room_id: message.chat_room_id,
      message: message.message,
      sender_user_id: message.sender_user_id,
      is_read: message.is_read,
      created_at: message.created_at.toISOString(),
      sender: {
        nickname: message.users.nickname,
        profile_image: message.users.profile_image,
      },
    }));

    // 커서 생성
    const nextCursor =
      hasMore && sortedMessages.length > 0
        ? sortedMessages[sortedMessages.length - 1]?.created_at
        : undefined;
    const prevCursor = sortedMessages.length > 0 ? sortedMessages[0]?.created_at : undefined;

    return {
      data: {
        messages: sortedMessages,
        hasMore,
        nextCursor,
        prevCursor,
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 조회 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '메시지를 불러오는데 실패했습니다.',
        code: 'DATABASE_ERROR',
      },
    };
  }
};

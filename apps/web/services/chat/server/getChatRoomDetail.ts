import { prisma } from '@web/lib/prisma';
import type {
  ChatRoomWithDetails,
  GetChatRoomDetailAPIRequest,
  GetChatRoomDetailAPIResponse,
} from '@web/types';

/**
 * 특정 채팅방의 상세 정보를 조회하는 서비스 함수
 */
export const getChatRoomDetail = async (
  request: GetChatRoomDetailAPIRequest
): Promise<GetChatRoomDetailAPIResponse> => {
  try {
    const { chat_room_id: chatRoomId, user_id: userId } = request;

    // 채팅방 상세 정보 조회 (Prisma include를 사용한 조인)
    const chatRoom = await prisma.chat_rooms.findFirst({
      where: {
        chat_room_id: chatRoomId,
        OR: [{ buyer_user_id: userId }, { seller_user_id: userId }],
      },
      include: {
        users_chat_rooms_buyer_user_idTousers: {
          select: {
            nickname: true,
            profile_image: true,
          },
        },
        users_chat_rooms_seller_user_idTousers: {
          select: {
            nickname: true,
            profile_image: true,
          },
        },
        products: {
          select: {
            title: true,
            start_price: true,
            min_price: true,
            status: true,
          },
        },
      },
    });

    if (!chatRoom) {
      return {
        data: null,
        error: {
          message: '채팅방을 찾을 수 없거나 접근 권한이 없습니다.',
        },
      };
    }

    // 마지막 메시지 조회
    const lastMessage = await prisma.chat_messages.findFirst({
      where: {
        chat_room_id: chatRoomId,
      },
      select: {
        message: true,
        created_at: true,
        sender_user_id: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 읽지 않은 메시지 수 계산
    const unreadCount = await prisma.chat_messages.count({
      where: {
        chat_room_id: chatRoomId,
        is_read: false,
        sender_user_id: {
          not: userId,
        },
      },
    });

    const chatRoomWithDetails: ChatRoomWithDetails = {
      chat_room_id: chatRoom.chat_room_id,
      product_id: Number(chatRoom.product_id),
      seller_user_id: chatRoom.seller_user_id,
      buyer_user_id: chatRoom.buyer_user_id,
      created_at: chatRoom.created_at.toISOString(),
      updated_at: chatRoom.updated_at?.toISOString() || null,
      buyer_profile: {
        nickname: chatRoom.users_chat_rooms_buyer_user_idTousers.nickname,
        profile_image: chatRoom.users_chat_rooms_buyer_user_idTousers.profile_image,
      },
      seller_profile: {
        nickname: chatRoom.users_chat_rooms_seller_user_idTousers.nickname,
        profile_image: chatRoom.users_chat_rooms_seller_user_idTousers.profile_image,
      },
      product: {
        title: chatRoom.products.title,
        current_price: Number(chatRoom.products.start_price),
        status: chatRoom.products.status,
      },
      last_message: lastMessage
        ? {
            message: lastMessage.message,
            created_at: lastMessage.created_at.toISOString(),
            sender_user_id: lastMessage.sender_user_id,
          }
        : undefined,
      unread_count: unreadCount,
    };

    return {
      data: {
        chatRoom: chatRoomWithDetails,
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 상세 조회 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '서버 오류가 발생했습니다.',
      },
    };
  }
};

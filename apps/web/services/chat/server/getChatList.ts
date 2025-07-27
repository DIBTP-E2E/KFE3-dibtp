import { prisma } from '@web/lib/prisma';
import type { GetChatRoomsAPIRequest, GetChatRoomsAPIResponse } from '@web/types/chat';

/**
 * 사용자의 채팅방 목록을 조회하는 서비스 함수
 */
export const getChatList = async (
  request: GetChatRoomsAPIRequest
): Promise<GetChatRoomsAPIResponse> => {
  try {
    const { user_id: userId, filter = {}, limit = 20, offset = 0 } = request;

    // status 필터에 따른 추가 조건 구성
    const buildStatusFilter = () => {
      switch (filter.status) {
        case 'unread':
          // 읽지 않은 메시지가 있는 채팅방만 조회
          return [
            {
              chat_messages: {
                some: {
                  is_read: false,
                  sender_user_id: {
                    not: userId,
                  },
                },
              },
            },
          ];
        case 'active': {
          // 최근 7일 내 활동이 있는 채팅방만 조회
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return [
            {
              OR: [
                { updated_at: { gte: sevenDaysAgo } },
                {
                  chat_messages: {
                    some: {
                      created_at: { gte: sevenDaysAgo },
                    },
                  },
                },
              ],
            },
          ];
        }
        case 'all':
        default:
          return [];
      }
    };

    // 채팅방 목록 조회 (Prisma include를 사용한 조인)
    const chatRooms = await prisma.chat_rooms.findMany({
      where: {
        AND: [
          {
            OR: [{ buyer_user_id: userId }, { seller_user_id: userId }],
          },
          ...(filter.product_id ? [{ product_id: BigInt(filter.product_id) }] : []),
          ...buildStatusFilter(),
        ],
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
        chat_messages: {
          select: {
            message: true,
            created_at: true,
            sender_user_id: true,
          },
          orderBy: {
            created_at: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
      skip: offset,
      take: limit,
    });

    // 전체 개수 조회 (같은 필터 조건 적용)
    const totalCount = await prisma.chat_rooms.count({
      where: {
        AND: [
          {
            OR: [{ buyer_user_id: userId }, { seller_user_id: userId }],
          },
          ...(filter.product_id ? [{ product_id: BigInt(filter.product_id) }] : []),
          ...buildStatusFilter(),
        ],
      },
    });

    // 각 채팅방의 읽지 않은 메시지 수 계산
    const chatRoomsWithUnreadCount = await Promise.all(
      chatRooms.map(async (room) => {
        const unreadCount = await prisma.chat_messages.count({
          where: {
            chat_room_id: room.chat_room_id,
            is_read: false,
            sender_user_id: {
              not: userId,
            },
          },
        });

        return {
          chat_room_id: room.chat_room_id,
          product_id: Number(room.product_id),
          seller_user_id: room.seller_user_id,
          buyer_user_id: room.buyer_user_id,
          created_at: room.created_at.toISOString(),
          updated_at: room.updated_at?.toISOString() || null,
          buyer_profile: {
            nickname: room.users_chat_rooms_buyer_user_idTousers.nickname,
            profile_image: room.users_chat_rooms_buyer_user_idTousers.profile_image,
          },
          seller_profile: {
            nickname: room.users_chat_rooms_seller_user_idTousers.nickname,
            profile_image: room.users_chat_rooms_seller_user_idTousers.profile_image,
          },
          product: {
            title: room.products.title,
            current_price: Number(room.products.start_price),
            status: room.products.status,
          },
          last_message: room.chat_messages[0]
            ? {
                message: room.chat_messages[0].message,
                created_at: room.chat_messages[0].created_at.toISOString(),
                sender_user_id: room.chat_messages[0].sender_user_id,
              }
            : undefined,
          unread_count: unreadCount,
        };
      })
    );

    return {
      data: {
        chatRooms: chatRoomsWithUnreadCount,
        totalCount,
        hasMore: totalCount > offset + chatRooms.length,
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 목록 조회 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '서버 오류가 발생했습니다.',
      },
    };
  }
};

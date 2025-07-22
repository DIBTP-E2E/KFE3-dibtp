import { prisma } from '@web/lib/prisma';
import type { CreateChatRoomPayload, CreateChatRoomAPIResponse } from '@web/types';

/**
 * 채팅방을 생성하거나 기존 채팅방을 반환하는 서비스 함수
 */
export const createChatRoom = async (
  payload: CreateChatRoomPayload
): Promise<CreateChatRoomAPIResponse> => {
  try {
    const { product_id, buyer_user_id, seller_user_id } = payload;

    // 상품 등록자가 본인이면 error
    if (buyer_user_id === seller_user_id) {
      return {
        data: null,
        error: {
          message: '본인이 등록한 상품은 채팅방을 생성할 수 없습니다.',
        },
      };
    }

    // 기존 채팅방 확인
    const existingRoom = await prisma.chat_rooms.findFirst({
      where: {
        product_id: BigInt(product_id),
        buyer_user_id,
        seller_user_id,
      },
    });

    // 기존 채팅방이 있으면 반환
    if (existingRoom) {
      return {
        data: {
          chatRoom: {
            ...existingRoom,
            product_id: Number(existingRoom.product_id),
            created_at: existingRoom.created_at.toISOString(),
            updated_at: existingRoom.updated_at?.toISOString() ?? null,
          },
          isExisting: true,
        },
        error: null,
      };
    }

    // 새 채팅방 생성
    const newRoom = await prisma.chat_rooms.create({
      data: {
        product_id: BigInt(product_id),
        buyer_user_id,
        seller_user_id,
      },
    });

    return {
      data: {
        chatRoom: {
          ...newRoom,
          product_id: Number(newRoom.product_id),
          created_at: newRoom.created_at.toISOString(),
          updated_at: newRoom.updated_at?.toISOString() ?? null,
        },
        isExisting: false,
      },
      error: null,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 생성 오류:', error);
    }

    return {
      data: null,
      error: {
        message: '서버 오류가 발생했습니다.',
      },
    };
  }
};

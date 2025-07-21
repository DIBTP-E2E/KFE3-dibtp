import { supabaseServerClient } from '@web/lib/supabase/server';
import type { CreateChatRoomPayload, CreateChatRoomAPIResponse } from '@web/types';

/**
 * 채팅방을 생성하거나 기존 채팅방을 반환하는 서비스 함수
 */
export const createChatRoom = async (
  payload: CreateChatRoomPayload
): Promise<CreateChatRoomAPIResponse> => {
  try {
    const supabase = await supabaseServerClient();
    const { product_id, buyer_user_id, seller_user_id } = payload;

    // 기존 채팅방 확인
    const { data: existingRoom, error: findError } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('product_id', product_id)
      .eq('buyer_user_id', buyer_user_id)
      .eq('seller_user_id', seller_user_id)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      // PGRST116 = not found
      return {
        data: null,
        error: {
          message: '채팅방 조회 중 오류가 발생했습니다.',
          code: findError.code,
        },
      };
    }

    // 상품 등록자가 본인이면 error
    if (existingRoom) {
      return {
        data: null,
        error: {
          message: '본인이 등록한 상품은 채팅방을 생성할 수 없습니다.',
        },
      };
    }

    // 기존 채팅방이 있으면 반환
    if (existingRoom) {
      return {
        data: {
          chatRoom: existingRoom,
          isExisting: true,
        },
        error: null,
      };
    }

    // 새 채팅방 생성
    const { data: newRoom, error: createError } = await supabase
      .from('chat_rooms')
      .insert({
        product_id,
        buyer_user_id,
        seller_user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      return {
        data: null,
        error: {
          message: createError.message,
          code: createError.code,
        },
      };
    }

    return {
      data: {
        chatRoom: newRoom,
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

import { NextRequest, NextResponse } from 'next/server';

import { createChatRoom, getChatList } from '@web/services/chat/server';
import type {
  CreateChatRoomPayload,
  GetChatRoomsAPIRequest,
  ChatListFilter,
} from '@web/types/chat';

/**
 * 채팅방 목록 조회 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    // URL 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const status = searchParams.get('status');
    const productId = searchParams.get('product_id');

    // 필수 파라미터 검증
    if (!userId) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '사용자 ID는 필수입니다.',
            code: 'MISSING_USER_ID',
          },
        },
        { status: 400 }
      );
    }

    // 요청 객체 구성
    const filter: ChatListFilter = {};
    if (status && (status === 'all' || status === 'unread' || status === 'active')) {
      filter.status = status;
    }
    if (productId) {
      filter.product_id = parseInt(productId, 10);
    }

    const requestPayload: GetChatRoomsAPIRequest = {
      user_id: userId,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    };

    // 서버 함수 호출
    const result = await getChatList(requestPayload);

    // 에러 처리
    if (result.error) {
      return NextResponse.json(result, {
        status: result.error.code === 'MISSING_USER_ID' ? 400 : 500,
      });
    }

    // 성공 응답
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 목록 조회 오류 API 오류:', error);
    }

    return NextResponse.json(
      {
        data: null,
        error: {
          message: '서버 내부 오류가 발생했습니다.',
          code: 'INTERNAL_SERVER_ERROR',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * 채팅방 생성 API 엔드포인트
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 바디 파싱
    const payload: CreateChatRoomPayload = await request.json();

    // 입력 검증
    if (!payload.product_id || !payload.buyer_user_id || !payload.seller_user_id) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '필수 파라미터가 누락되었습니다.',
            code: 'MISSING_PARAMETERS',
          },
        },
        { status: 400 }
      );
    }

    // 서버 함수 호출
    const result = await createChatRoom(payload);

    // 에러 처리
    if (result.error) {
      return NextResponse.json(result, {
        status: result.error.code === 'MISSING_PARAMETERS' ? 400 : 500,
      });
    }

    // 성공 응답
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 생성 오류 위치 API route:', error);
    }

    return NextResponse.json(
      {
        data: null,
        error: {
          message: error,
          code: 'INTERNAL_SERVER_ERROR',
        },
      },
      { status: 500 }
    );
  }
}

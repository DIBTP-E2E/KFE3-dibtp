import { NextRequest, NextResponse } from 'next/server';

import { createChatRoom } from '@/services/chat/server/createChatRoom';

import type { CreateChatRoomPayload } from '@web/types/chat';

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
    console.error('채팅방 생성 API 오류:', error);
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

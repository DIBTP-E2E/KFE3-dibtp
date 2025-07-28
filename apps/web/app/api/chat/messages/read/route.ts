import { NextRequest, NextResponse } from 'next/server';

import type { MarkMessagesAsReadAPIRequest } from '@/types/chat';

import { markMessagesAsRead } from '@/services/chat/server/markMessagesAsRead';

/**
 * 메시지 읽음 처리 API 엔드포인트
 */
export async function PATCH(request: NextRequest) {
  try {
    // 요청 바디 안전하게 파싱
    let payload: MarkMessagesAsReadAPIRequest;

    try {
      const body = await request.text();
      if (!body.trim()) {
        return NextResponse.json(
          {
            data: null,
            error: {
              message: '요청 바디가 비어있습니다.',
              code: 'EMPTY_BODY',
            },
          },
          { status: 400 }
        );
      }
      payload = JSON.parse(body);
    } catch (parseError) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '잘못된 JSON 형식입니다.',
            code: 'INVALID_JSON',
          },
        },
        { status: 400 }
      );
    }

    // 입력 검증
    if (!payload.chat_room_id || !payload.user_id) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '채팅방 ID와 사용자 ID는 필수입니다.',
            code: 'MISSING_REQUIRED_PARAMS',
          },
        },
        { status: 400 }
      );
    }

    // 서버 함수 호출
    const result = await markMessagesAsRead(payload);

    // 에러 처리
    if (result.error) {
      return NextResponse.json(result, {
        status: result.error.code === 'MISSING_REQUIRED_PARAMS' ? 400 : 500,
      });
    }

    // 성공 응답
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 읽음 처리 API 오류:', error);
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

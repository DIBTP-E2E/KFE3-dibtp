import { NextRequest, NextResponse } from 'next/server';

import type { SendMessageAPIRequest } from '@/types/chat';

import { sendMessage } from '@/services/chat/server/sendMessage';

/**
 * 메시지 전송 API 엔드포인트
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 바디 파싱
    const payload: SendMessageAPIRequest = await request.json();

    // 입력 검증
    if (!payload.chat_room_id || !payload.message || !payload.sender_user_id) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '채팅방 ID, 메시지 내용, 발신자 ID는 필수입니다.',
            code: 'MISSING_REQUIRED_PARAMS',
          },
        },
        { status: 400 }
      );
    }

    // 메시지 길이 검증
    if (payload.message.length > 1000) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: '메시지는 1000자를 초과할 수 없습니다.',
            code: 'MESSAGE_TOO_LONG',
          },
        },
        { status: 400 }
      );
    }

    // 서버 함수 호출
    const result = await sendMessage(payload);

    // 에러 처리
    if (result.error) {
      return NextResponse.json(result, {
        status:
          result.error.code === 'MISSING_REQUIRED_PARAMS' ||
          result.error.code === 'MESSAGE_TOO_LONG'
            ? 400
            : 500,
      });
    }

    // 성공 응답
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 전송 API 오류:', error);
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

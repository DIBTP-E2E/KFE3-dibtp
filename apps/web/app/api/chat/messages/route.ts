import { NextRequest, NextResponse } from 'next/server';

import type { GetMessagesAPIRequest } from '@/types/chat';

import { getMessages } from '@/services/chat/server/getMessages';

/**
 * 채팅 메시지 조회 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    // URL 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const chatRoomId = searchParams.get('chat_room_id');
    const userId = searchParams.get('user_id');
    const limit = searchParams.get('limit');
    const before = searchParams.get('before');
    const after = searchParams.get('after');

    // 필수 파라미터 검증
    if (!chatRoomId || !userId) {
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

    // 요청 객체 구성
    const requestPayload: GetMessagesAPIRequest = {
      chat_room_id: chatRoomId,
      user_id: userId,
      pagination: {
        limit: limit ? parseInt(limit, 10) : undefined,
        before: before || undefined,
        after: after || undefined,
      },
    };

    // 서버 함수 호출
    const result = await getMessages(requestPayload);

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
      console.error('메시지 조회 API 오류:', error);
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

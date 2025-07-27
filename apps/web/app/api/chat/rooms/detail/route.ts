import { NextRequest } from 'next/server';

import { getChatRoomDetail } from '@web/services/chat/server';

import type { GetChatRoomDetailAPIRequest } from '@web/types/chat';

export async function POST(request: NextRequest) {
  try {
    const body: GetChatRoomDetailAPIRequest = await request.json();

    const result = await getChatRoomDetail(body);

    return Response.json(result);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 상세 API 오류:', error);
    }

    return Response.json(
      {
        data: null,
        error: {
          message: '서버 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}

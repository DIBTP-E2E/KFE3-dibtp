import { API_ROUTES } from '@web/constants';

import type { GetChatRoomDetailAPIRequest, GetChatRoomDetailAPIResponse } from '@web/types/chat';

/**
 * 채팅방 상세 정보를 조회하는 클라이언트 함수
 */
export const fetchChatRoomDetail = async (
  request: GetChatRoomDetailAPIRequest
): Promise<GetChatRoomDetailAPIResponse> => {
  try {
    const response = await fetch(API_ROUTES.CHAT.ROOM_DETAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('채팅방 상세 조회 클라이언트 오류:', error);
    }
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : '네트워크 오류가 발생했습니다.',
      },
    };
  }
};

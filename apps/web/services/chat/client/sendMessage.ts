import { API_ROUTES } from '@web/constants';

import type { SendMessageAPIRequest, SendMessageAPIResponse } from '@web/types/chat';

/**
 * 메시지 전송을 위한 클라이언트 서비스 함수
 */
export const sendMessage = async (
  request: SendMessageAPIRequest
): Promise<SendMessageAPIResponse> => {
  try {
    const response = await fetch(API_ROUTES.CHAT.SEND_MESSAGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const result: SendMessageAPIResponse = await response.json();

    // HTTP 에러 상태 코드 체크
    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status} 오류`);
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 전송 클라이언트 오류:', error);
    }

    // 네트워크 오류 또는 JSON 파싱 오류 처리
    if (error instanceof Error) {
      return {
        data: null,
        error: {
          message: error.message,
          code: 'CLIENT_ERROR',
        },
      };
    }

    return {
      data: null,
      error: {
        message: '알 수 없는 오류가 발생했습니다.',
        code: 'UNKNOWN_ERROR',
      },
    };
  }
};

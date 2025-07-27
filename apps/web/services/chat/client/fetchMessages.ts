import { API_ROUTES } from '@web/constants';

import type { GetMessagesAPIRequest, GetMessagesAPIResponse } from '@web/types/chat';

/**
 * 메시지 목록 조회를 위한 클라이언트 서비스 함수
 */
export const fetchMessages = async (
  request: GetMessagesAPIRequest
): Promise<GetMessagesAPIResponse> => {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams({
      chat_room_id: request.chat_room_id,
      user_id: request.user_id,
    });

    // 페이지네이션 파라미터 추가
    if (request.pagination?.limit) {
      params.append('limit', request.pagination.limit.toString());
    }
    if (request.pagination?.before) {
      params.append('before', request.pagination.before);
    }
    if (request.pagination?.after) {
      params.append('after', request.pagination.after);
    }

    // const response = await fetch(`/api/chat/messages?${params.toString()}`, {

    const response = await fetch(API_ROUTES.CHAT.MESSAGES(params.toString()), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result: GetMessagesAPIResponse = await response.json();

    // HTTP 에러 상태 코드 체크
    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status} 오류`);
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('메시지 조회 클라이언트 오류:', error);
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

'use client';

import { API_ROUTES } from '@web/constants';

import type { BidHistoryResponse } from '@web/types';

/**
 * 사용자의 입찰 내역을 조회하는 클라이언트 서비스 함수
 */
export const fetchBidHistory = async (): Promise<BidHistoryResponse> => {
  try {
    const response = await fetch(`${API_ROUTES.BIDS}/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '입찰 내역 조회에 실패했습니다');
    }

    return response.json();
  } catch (error) {
    console.error('입찰 내역 조회 클라이언트 오류:', error);
    throw error;
  }
};

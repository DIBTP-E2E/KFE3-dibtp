'use client';

import { useQuery } from '@tanstack/react-query';

import { BID_HISTORY_QUERY_KEY } from '@web/constants';
import { fetchBidHistory } from '@web/services/bids/client';

/**
 * 입찰 내역 조회 훅
 */
export const useBidHistory = () => {
  return useQuery({
    queryKey: BID_HISTORY_QUERY_KEY,
    queryFn: () => fetchBidHistory(),
  });
};

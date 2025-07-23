import type { BidWithProduct } from './domain';

/**
 * 입찰 내역 조회 API 응답
 */
export interface BidHistoryResponse {
  /** 입찰 목록 */
  bids: BidWithProduct[];
}

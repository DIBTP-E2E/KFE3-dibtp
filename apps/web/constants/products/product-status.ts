// 상품 상태 상수 (schema의 enum 값들)
export const PRODUCT_STATUS = {
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  CANCEL: 'CANCEL',
} as const;

export const PRODUCT_STATUS_VALUES = Object.values(PRODUCT_STATUS);

// 상품 상태 표시 라벨
export const PRODUCT_STATUS_LABELS = {
  [PRODUCT_STATUS.ACTIVE]: '경매 중',
  [PRODUCT_STATUS.SOLD]: '낙찰',
  [PRODUCT_STATUS.CANCEL]: '경매 중지',
} as const;

// 상품 상태 변경 액션 라벨
export const PRODUCT_STATUS_ACTION_LABELS = {
  START_AUCTION: '경매 시작',
  STOP_AUCTION: '경매 중지',
  EDIT_PRODUCT: '수정하기',
  DELETE_PRODUCT: '삭제하기',
  SHARE_PRODUCT: '공유하기',
} as const;

// 상품 상태 변경 성공 메시지
export const PRODUCT_STATUS_MESSAGES = {
  AUCTION_STARTED: '경매가 시작되었습니다.',
  AUCTION_STOPPED: '경매가 중지되었습니다.',
  STATUS_CHANGE_FAILED: '상태 변경에 실패했습니다.',
} as const;

// 상품 가격이 업데이트되는 시간 단위 상수(30분)
export const DECREASE_INTERVAL_SECONDS = 30 * 60;

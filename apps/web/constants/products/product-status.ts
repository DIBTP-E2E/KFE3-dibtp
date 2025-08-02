// 상품 상태 상수 (schema의 enum 값들)
export const PRODUCT_STATUS = {
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  CANCEL: 'CANCEL',
} as const;

export const PRODUCT_STATUS_VALUES = Object.values(PRODUCT_STATUS);

// 상품 가격이 업데이트되는 시간 단위 상수(30분)
export const DECREASE_INTERVAL_SECONDS = 30 * 60;

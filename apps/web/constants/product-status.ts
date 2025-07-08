// 상품 상태 상수 (schema의 enum 값들)
export const PRODUCT_STATUS = {
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  EXPIRED: 'EXPIRED',
  CANCEL: 'CANCEL',
} as const;

export const PRODUCT_STATUS_VALUES = Object.values(PRODUCT_STATUS);

import { z } from 'zod';

// 재사용 가능한 필드 스키마들
const titleField = z
  .string()
  .min(1, '상품명을 입력해주세요')
  .max(100, '상품명은 100자 이하로 입력해주세요');

const descriptionField = z
  .string()
  .min(1, '상품 설명을 입력해주세요')
  .max(2000, '상품 설명은 2000자 이하로 입력해주세요');

const priceField = (fieldName: string) =>
  z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, `${fieldName}은 0보다 큰 숫자여야 합니다`);

const regionField = z.string().min(1, '지역을 선택해주세요');

const detailAddressField = z.string().min(1, '상세 주소를 선택해주세요');

// 확장된 지역 및 상세 주소 필드 (길이 제한 포함)
const extendedRegionField = regionField.max(50, '지역은 50자 이하로 입력해주세요');

const extendedDetailAddressField = detailAddressField.max(
  200,
  '상세 주소는 200자 이하로 입력해주세요'
);

// 공통 필드들을 정의한 베이스 스키마
const baseProductFields = {
  title: titleField,
  description: descriptionField,
  start_price: priceField('시작 가격'),
  min_price: priceField('최소 가격'),
  decrease_unit: priceField('가격 감소 단위'),
  region: regionField,
  detail_address: detailAddressField,
};

// 공통 검증 규칙들
const priceValidationRefinement = (data: {
  start_price: string;
  min_price: string;
  [key: string]: unknown;
}) => {
  const startPrice = parseFloat(data.start_price);
  const minPrice = parseFloat(data.min_price);
  return startPrice >= minPrice;
};

const priceValidationConfig = {
  message: '시작 가격은 최소 가격보다 크거나 같아야 합니다',
  path: ['start_price'],
};

// 기본 상품 스키마
export const productSchema = z
  .object(baseProductFields)
  .refine(priceValidationRefinement, priceValidationConfig);

// 이미지가 포함된 상품 스키마
export const productWithImagesSchema = z
  .object({
    ...baseProductFields,
    region: extendedRegionField,
    detail_address: extendedDetailAddressField,
    images: z.array(z.instanceof(File)).optional(),
  })
  .refine(priceValidationRefinement, priceValidationConfig);

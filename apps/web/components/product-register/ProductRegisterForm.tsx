'use client';

import { Button } from '@repo/ui/components';

import { useProductForm } from '@/hooks';

import {
  ProductImage,
  TitleField,
  DescriptionField,
  StartPriceField,
  MinimumPriceField,
  DecreaseUnitField,
  LocationInfoField,
} from '../product-form';

const ProductRegisterForm = () => {
  const {
    formData,
    images,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
  } = useProductForm({ mode: 'create' });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이미지 업로드 */}
      <ProductImage images={images} errors={errors} onImagesChange={handleImagesChange} />

      {/* 상품명 */}
      <TitleField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 상품설명 */}
      <DescriptionField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 경매 시작가 */}
      <StartPriceField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 최저 도달가 */}
      <MinimumPriceField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 가격 감소 단위 */}
      <DecreaseUnitField formData={formData} errors={errors} onInputChange={handleInputChange} />

      {/* 거래 주소 */}
      <LocationInfoField errors={errors} onInputChange={handleInputChange} />

      {/* 등록 버튼 */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '등록 중...' : '상품 등록'}
      </Button>
    </form>
  );
};

export default ProductRegisterForm;

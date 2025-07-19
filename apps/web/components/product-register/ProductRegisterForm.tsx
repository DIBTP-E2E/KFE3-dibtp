'use client';

import { Button } from '@repo/ui/components';

import ImageUpload from '@/components/ui/ImageUpload';

import { useProductForm } from '@/hooks';

import DecreaseUnitField from './DecreaseUnitField';
import DescriptionField from './DescriptionField';
import LocationInfoField from './LocationInfoField';
import MinimumPriceField from './MinimumPriceField';
import StartPriceField from './StartPriceField';
import TitleField from './TitleField';

const ProductRegisterForm = () => {
  const {
    formData,
    images,
    errors,
    isSubmitting,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
  } = useProductForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이미지 업로드 */}
      <ImageUpload images={images} onImagesChange={handleImagesChange} />

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

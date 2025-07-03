import { LabeledInput } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const MinimumPriceField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledInput
      label="최저 도달 가격"
      type="number"
      placeholder="희망하는 최저 도달 가격을 적어주세요."
      value={formData.min_price}
      onChange={onInputChange('min_price')}
      error={errors.min_price}
      required
    />
  );
};

export default MinimumPriceField;

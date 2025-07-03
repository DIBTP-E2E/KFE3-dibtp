import { LabeledInput } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const StartPriceField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledInput
      label="경매 시작 가격"
      type="number"
      placeholder="희망하는 경매 시작 가격을 적어주세요"
      value={formData.start_price}
      onChange={onInputChange('start_price')}
      required
      error={errors.start_price}
    />
  );
};

export default StartPriceField;

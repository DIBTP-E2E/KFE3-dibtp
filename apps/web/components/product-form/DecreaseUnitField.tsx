import { LabeledInput } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const DecreaseUnitField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledInput
      label="가격 감소 단위"
      type="number"
      placeholder="가격 감소 단위를 적어주세요."
      value={formData.decrease_unit}
      onChange={onInputChange('decrease_unit')}
      error={errors.decrease_unit}
      required
    />
  );
};

export default DecreaseUnitField;

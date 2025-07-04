import { LabeledInput } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const TitleField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledInput
      label="상품명"
      placeholder="상품명을 입력하세요"
      value={formData.title}
      onChange={onInputChange('title')}
      required
      error={errors?.title}
    />
  );
};

export default TitleField;

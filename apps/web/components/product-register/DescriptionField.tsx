import { LabeledTextarea } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const DescriptionField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledTextarea
      label="자세한 설명"
      placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요."
      minRows={6}
      value={formData.description}
      onChange={onInputChange('description')}
      error={errors?.description}
      required
    />
  );
};

export default DescriptionField;

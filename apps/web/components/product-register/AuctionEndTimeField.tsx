import { LabeledInput } from '@repo/ui/components';

import { ProductFormFieldProps } from '@/types';

const AuctionEndTimeField = ({ formData, errors, onInputChange }: ProductFormFieldProps) => {
  return (
    <LabeledInput
      label="경매 종료 시간"
      type="datetime-local"
      value={formData.auction_end_time}
      onChange={onInputChange('auction_end_time')}
      error={errors.auction_end_time}
      required
    />
  );
};

export default AuctionEndTimeField;

'use client';

import { Button, Icon } from '@repo/ui/components';

interface AddressSearchButtonProps {
  onSearch: () => void;
  disabled?: boolean;
}

const AddressSearchButton = ({ onSearch, disabled = false }: AddressSearchButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onSearch}
      disabled={disabled}
      variant="outlined"
      size="sm"
      className="flex items-center whitespace-nowrap"
    >
      <Icon name="Search" size="sm" />
      주소 검색
    </Button>
  );
};

export default AddressSearchButton;

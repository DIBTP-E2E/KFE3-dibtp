'use client';

import { cn } from '@repo/ui/utils/cn';

import { BackButton, CloseTextButton } from '../../header-icon';

import HeaderContainer from '../HeaderContainer';

import SearchInput from './SearchInput';

interface SearchHeaderProps {
  resultKeyword?: string;
  onClose?: () => void;
  autoFocus?: boolean;
  hasSearchDropDown?: boolean;
}

const SearchHeader = ({
  resultKeyword,
  onClose,
  autoFocus = false,
  hasSearchDropDown = false,
}: SearchHeaderProps) => {
  return (
    <HeaderContainer className="pr-0">
      {!resultKeyword && <h2 className={cn('font-style-headline-h5', 'sr-only')}>검색하기</h2>}

      <BackButton onClick={onClose} />

      <SearchInput
        resultKeyword={resultKeyword}
        autoFocus={autoFocus}
        hasSearchDropDown={hasSearchDropDown}
      />

      <CloseTextButton onClick={onClose} className="-mr-container" />
    </HeaderContainer>
  );
};

export default SearchHeader;

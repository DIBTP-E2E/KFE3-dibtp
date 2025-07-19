'use client';

import { cn } from '@repo/ui/utils/cn';

import { BackButton, CloseTextButton } from '../../header-icon';

import HeaderContainer from '../HeaderContainer';

import SearchInput from './SearchInput';

interface SearchHeaderProps {
  resultKeyword?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

const SearchHeader = ({ resultKeyword, onClose, autoFocus }: SearchHeaderProps) => {
  return (
    <HeaderContainer className="pr-0">
      {!resultKeyword && <h2 className={cn('font-style-headline-h5', 'sr-only')}>검색하기</h2>}

      <BackButton onClick={onClose} />

      <SearchInput resultKeyword={resultKeyword} autoFocus={autoFocus} />

      <CloseTextButton onClick={onClose} />
    </HeaderContainer>
  );
};

export default SearchHeader;

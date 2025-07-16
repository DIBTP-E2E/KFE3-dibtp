import { cn } from '@repo/ui/utils/cn';

import { getUserRegion } from '@/utils/user/server';

import { BackButton, CloseTextButton } from '../../header-icon';

import HeaderContainer from '../HeaderContainer';

import SearchInput from './SearchInput';

interface SearchHeaderProps {
  resultKeyword?: string;
  onClose?: () => void;
}

const SearchHeader = async ({ resultKeyword, onClose }: SearchHeaderProps) => {
  const region = await getUserRegion();

  return (
    <HeaderContainer className="pr-0">
      {resultKeyword ? (
        <h1 className={cn('font-style-headline-h5', 'sr-only')}>{resultKeyword} 검색 결과</h1>
      ) : (
        <h2 className={cn('font-style-headline-h5', 'sr-only')}>검색하기</h2>
      )}

      <BackButton onClick={onClose} />

      <SearchInput resultKeyword={resultKeyword} region={region} />

      <CloseTextButton onClick={onClose} />
    </HeaderContainer>
  );
};

export default SearchHeader;

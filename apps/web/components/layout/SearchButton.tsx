import { Icon } from '@repo/ui/components';

const SearchButton = () => {
  return (
    <button
      className="flex items-center justify-center w-12 h-12 text-text-base"
      aria-label="검색하기"
    >
      <Icon name="Search" size="md" />
    </button>
  );
};

export default SearchButton;

'use client';

import { Icon } from '@repo/ui/components';

import { cn } from '@repo/ui/utils/cn';

import { useRecentSearches, useAppNavigation } from '@web/hooks';

interface RecentKeywordsProps {
  onKeywordClick?: (keyword: string) => void;
  selectedIndex?: number;
}

const RecentKeywords = ({ onKeywordClick, selectedIndex = -1 }: RecentKeywordsProps) => {
  const { goToSearch } = useAppNavigation();
  const { recentSearches, removeRecentSearch, clearAllRecentSearches, addRecentSearch } =
    useRecentSearches();

  const handleDefaultClick = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    addRecentSearch(trimmedKeyword);
    goToSearch(trimmedKeyword);
  };

  const handleClick = onKeywordClick || handleDefaultClick;

  return (
    <section>
      <div className="flex items-center justify-between mb-container">
        <h3 className="font-style-large">최근 검색</h3>

        <button
          onClick={clearAllRecentSearches}
          className="text-text-info hover:opacity-70 transition-opacity"
        >
          전체 삭제
        </button>
      </div>

      {recentSearches.length > 0 ? (
        <ul className="space-y-3">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center justify-between hover:bg-bg-base rounded-sm transition-all',
                selectedIndex === index && 'bg-bg-base'
              )}
            >
              <button
                onClick={() => handleClick(search)}
                className={cn(
                  'h-[32px] flex-1 flex items-center gap-sm text-left transition-colors',
                  selectedIndex === index && 'text-text-primary'
                )}
              >
                <Icon name="ClockThin" size="xs" color="info" />

                <span className="flex-1">{search}</span>
              </button>

              <button
                onClick={() => removeRecentSearch(index)}
                className={cn(
                  'inline-flex justify-center items-center',
                  'w-[32px] h-[32px] hover:opacity-70 transition-opacity'
                )}
                aria-label={`${search} 검색어 삭제`}
              >
                <Icon name="Cancel" size="sm" color="info" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-text-info py-8">
          <Icon name="ClockThin" size="lg" color="info" className="mx-auto mb-2" />
          <p>최근 검색어가 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default RecentKeywords;

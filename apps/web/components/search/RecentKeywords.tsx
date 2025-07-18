'use client';

import { Icon } from '@repo/ui/components';

import { useRecentSearches } from '@/hooks/products/useRecentSearches';

interface RecentKeywordsProps {
  onKeywordClick?: (keyword: string) => void;
}

const RecentKeywords = ({ onKeywordClick }: RecentKeywordsProps) => {
  const { recentSearches, removeRecentSearch, clearAllRecentSearches } = useRecentSearches();

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
            <li key={index} className="flex items-center justify-between gap-sm">
              <button
                onClick={() => onKeywordClick?.(search)}
                className="flex-1 flex items-center py-sm gap-sm text-left"
              >
                <Icon name="ClockThin" size="xs" color="info" />
                <span className="flex-1">{search}</span>
              </button>

              <button
                onClick={() => removeRecentSearch(index)}
                className="w-[24px] h-full hover:opacity-70 transition-opacity"
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

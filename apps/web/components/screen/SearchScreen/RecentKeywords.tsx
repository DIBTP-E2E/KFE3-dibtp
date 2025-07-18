'use client';

import { Icon } from '@repo/ui/components';
import Link from 'next/link';

import { PAGE_ROUTES } from '@/constants';

import { useRecentSearches } from '@/hooks/products/useRecentSearches';

const RecentKeywords = () => {
  const { recentSearches, removeRecentSearch, clearAllRecentSearches } = useRecentSearches();

  return (
    <section>
      <div className="flex items-center justify-between mb-container">
        <h3 className="font-style-large">최근 검색</h3>

        <button
          onClick={clearAllRecentSearches}
          className="text-sm text-text-info hover:opacity-70 transition-opacity"
        >
          전체 삭제
        </button>
      </div>

      {recentSearches.length > 0 ? (
        <ul className="space-y-3">
          {recentSearches.map((search, index) => (
            <li key={index} className="flex items-center justify-between gap-sm">
              <div className="flex-1 flex items-center py-sm gap-sm">
                <Icon name="ClockThin" size="xs" color="info" />

                <Link href={PAGE_ROUTES.SEARCH(search)} className="flex-1">
                  <span>{search}</span>
                </Link>
              </div>

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

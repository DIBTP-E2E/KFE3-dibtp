import { useState, useEffect } from 'react';

const RECENT_SEARCHES_KEY = 'recent-searches';
const MAX_RECENT_SEARCHES = 10;

/**
 * 최근 검색어 관리를 위한 커스텀 훅
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 로컬스토리지에서 검색어 불러오기
  useEffect(() => {
    const getRecentSearches = (): string[] => {
      if (typeof window === 'undefined') return [];

      const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (savedSearches) {
        try {
          const parsedSearches = JSON.parse(savedSearches);

          return Array.isArray(parsedSearches) ? parsedSearches : [];
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('Failed to parse recent searches:', error);
          }

          return [];
        }
      }
      return [];
    };

    setRecentSearches(getRecentSearches());
  }, []);

  // 로컬스토리지에 검색어 저장
  const saveToLocalStorage = (searches: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    }
  };

  // 검색어 추가
  const addRecentSearch = (keyword: string) => {
    if (!keyword.trim()) return;

    const trimmedKeyword = keyword.trim();
    setRecentSearches((prev) => {
      // 중복 제거 후 최상단에 추가
      const filtered = prev.filter((search) => search !== trimmedKeyword);
      const newSearches = [trimmedKeyword, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      saveToLocalStorage(newSearches);

      return newSearches;
    });
  };

  // 선택적 삭제: 특정 인덱스의 검색어 삭제
  const removeRecentSearch = (index: number) => {
    setRecentSearches((prev) => {
      const newSearches = prev.filter((_, i) => i !== index);
      saveToLocalStorage(newSearches);

      return newSearches;
    });
  };

  // 전체 삭제: 모든 검색어 삭제
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  };
};

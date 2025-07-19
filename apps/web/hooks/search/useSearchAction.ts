'use client';

import { useRouter } from 'next/navigation';

import { PAGE_ROUTES } from '@/constants';

import { useRecentSearches } from './useRecentSearches';

/**
 * 검색 동작(검색어 저장 + 페이지 이동)을 담당하는 훅
 * SearchInput과 SearchScreen에서 재사용 가능
 */
export const useSearchAction = () => {
  const router = useRouter();
  const { addRecentSearch } = useRecentSearches();

  const searchKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    // 검색어 저장
    addRecentSearch(trimmedKeyword);

    // 검색 결과 페이지로 이동
    const encodedKeyword = encodeURIComponent(trimmedKeyword);
    router.push(`${PAGE_ROUTES.SEARCH(encodedKeyword)}`);
  };

  return {
    searchKeyword,
  };
};

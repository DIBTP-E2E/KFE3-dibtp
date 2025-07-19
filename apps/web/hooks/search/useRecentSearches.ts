'use client';

import { useState, useEffect } from 'react';

const RECENT_SEARCHES_KEY = 'recent-searches';
const MAX_RECENT_SEARCHES = 10;
const STORAGE_EVENT_NAME = 'recent-searches-updated';

/**
 * 최근 검색어 관리를 위한 커스텀 훅 (localStorage 이벤트 방식)
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // localStorage에서 검색어 불러오는 함수
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

  // 컴포넌트 마운트 시 초기화 및 이벤트 구독
  useEffect(() => {
    // 초기 데이터 로드
    setRecentSearches(getRecentSearches());

    // 커스텀 이벤트 리스너 등록 (동일 탭 내 동기화)
    const handleStorageUpdate = () => {
      setRecentSearches(getRecentSearches());
    };

    window.addEventListener(STORAGE_EVENT_NAME, handleStorageUpdate);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      window.removeEventListener(STORAGE_EVENT_NAME, handleStorageUpdate);
    };
  }, []);

  // 로컬스토리지에 검색어 저장 및 이벤트 발생
  const saveToLocalStorage = (searches: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      // 커스텀 이벤트 발생으로 다른 컴포넌트들에게 알림
      window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
    }
  };

  // 검색어 추가
  const addRecentSearch = (keyword: string) => {
    if (!keyword.trim()) return;

    const trimmedKeyword = keyword.trim();
    // 현재 상태에서 중복 제거 후 최상단에 추가
    const filtered = recentSearches.filter((search) => search !== trimmedKeyword);
    const newSearches = [trimmedKeyword, ...filtered].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(newSearches);
    saveToLocalStorage(newSearches);
  };

  // 선택적 삭제: 특정 인덱스의 검색어 삭제
  const removeRecentSearch = (index: number) => {
    const newSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(newSearches);
    saveToLocalStorage(newSearches);
  };

  // 전체 삭제: 모든 검색어 삭제
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      // 삭제 이벤트도 알림
      window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
    }
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  };
};

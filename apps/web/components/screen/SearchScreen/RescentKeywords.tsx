'use client';

import { useState } from 'react';

import { Icon } from '@repo/ui/components';

const RescentKeywords = () => {
  // TODO: SUPABASE에서 받아 올 수 있도록 수정 예정
  const [recentSearches, setRecentSearches] = useState([
    '스타벅스 머그',
    '스타벅스 외자',
    '스타벅스 프라푸치노 워터병',
  ]);

  // 선택적 삭제: 특정 인덱스의 검색어 삭제
  const removeRecentSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  // 전체 삭제: 모든 검색어 삭제
  const clearAllRecentSearches = () => setRecentSearches([]);

  return (
    <section className="flex-1 overflow-y-auto px-container py-container">
      <div className="flex items-center justify-between mb-container">
        <h3 className="font-style-large">최근 검색</h3>

        <button
          onClick={clearAllRecentSearches}
          className="text-sm text-text-info hover:text-text-base transition-colors"
        >
          전체 삭제
        </button>
      </div>

      {recentSearches.length > 0 ? (
        <dl className="space-y-3">
          {recentSearches.map((search, index) => (
            <li key={index} className="flex items-center justify-between gap-sm">
              <div className="flex items-center gap-sm">
                <Icon name="ClockThin" size="xs" color="info" />
                <span>{search}</span>
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
        </dl>
      ) : (
        <div className="text-center text-text-info py-8">
          <Icon name="ClockThin" size="lg" color="info" className="mx-auto mb-2" />
          <p>최근 검색어가 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default RescentKeywords;

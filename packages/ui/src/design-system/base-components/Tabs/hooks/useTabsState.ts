import { useState, useRef, useEffect, useCallback } from 'react';
import type { TabOption } from '../Tabs';

interface UseTabsStateProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const useTabsState = ({ options, activeTab, onTabChange }: UseTabsStateProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 활성 탭의 인덱스를 찾기
  const activeIndex = options.findIndex((option) => option.key === activeTab);

  // 포커스된 인덱스를 활성 탭으로 초기화
  useEffect(() => {
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [activeIndex]);

  // 키보드 네비게이션 핸들러
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      let newFocusIndex = index;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          newFocusIndex = (index + 1) % options.length;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newFocusIndex = index === 0 ? options.length - 1 : index - 1;
          break;
        case 'Home':
          event.preventDefault();
          newFocusIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newFocusIndex = options.length - 1;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (options[index] && !options[index].disabled) {
            onTabChange(options[index].key);
          }
          return;
        default:
          return;
      }

      // 비활성화된 탭은 건너뛰기
      while (
        newFocusIndex >= 0 &&
        newFocusIndex < options.length &&
        options[newFocusIndex]?.disabled
      ) {
        if (event.key === 'ArrowRight' || event.key === 'Home') {
          newFocusIndex = (newFocusIndex + 1) % options.length;
        } else {
          newFocusIndex = newFocusIndex === 0 ? options.length - 1 : newFocusIndex - 1;
        }
      }

      if (newFocusIndex >= 0 && newFocusIndex < options.length) {
        setFocusedIndex(newFocusIndex);
        tabRefs.current[newFocusIndex]?.focus();
      }
    },
    [options, onTabChange]
  );

  // 탭 클릭 핸들러
  const handleTabClick = useCallback(
    (option: TabOption, index: number) => {
      if (option.disabled) return;

      setFocusedIndex(index);
      onTabChange(option.key);
    },
    [onTabChange]
  );

  return {
    focusedIndex,
    tabRefs,
    handleKeyDown,
    handleTabClick,
  };
};

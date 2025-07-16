import React from 'react';
import { cn } from '@ui/utils/cn';
import { useTabsState } from './hooks/useTabsState';

export interface TabOption {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (key: string) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'lightMode' | 'darkMode';
  variant?: 'fulled' | 'outlined';
  className?: string;
  'aria-label'?: string;
}

const SIZE_CLASSES = {
  sm: 'py-xs px-md font-style-small',
  md: 'py-sm px-lg font-style-medium',
  lg: 'py-md px-xl font-style-large',
} as const;

const COLOR_CLASSES = {
  primary: {
    fulled: {
      container: 'bg-bg-base',
      active: 'bg-bg-primary text-text-inverse',
      inactive: 'text-text-info',
    },
    outlined: {
      container: 'bg-transparent',
      active: 'border border-border-primary text-text-primary bg-bg-primary/10',
      inactive: 'border border-transparent text-text-info',
    },
  },
  secondary: {
    fulled: {
      container: 'bg-bg-base',
      active: 'bg-bg-secondary text-text-inverse',
      inactive: 'text-text-info',
    },
    outlined: {
      container: 'bg-transparent',
      active: 'border border-border-secondary text-text-secondary bg-bg-secondary/10',
      inactive: 'border border-transparent text-text-info',
    },
  },
  lightMode: {
    fulled: {
      container: 'bg-bg-base',
      active: 'bg-bg-light text-text-base',
      inactive: 'text-text-info',
    },
    outlined: {
      container: 'bg-transparent',
      active: 'border border-border-inverse text-text-inverse bg-bg-dark/10',
      inactive: 'border border-transparent text-text-secondary',
    },
  },
  darkMode: {
    fulled: {
      container: 'bg-bg-dark',
      active: 'bg-bg-base text-text-base',
      inactive: 'text-text-info',
    },
    outlined: {
      container: 'bg-transparent',
      active: 'border border-border-base text-text-base bg-bg-base/10',
      inactive: 'border border-transparent text-text-info',
    },
  },
  danger: {
    fulled: {
      container: 'bg-bg-base',
      active: 'bg-bg-danger text-text-inverse',
      inactive: 'text-text-info',
    },
    outlined: {
      container: 'bg-transparent',
      active: 'border border-border-danger text-text-danger bg-bg-danger/10',
      inactive: 'border border-transparent text-text-info',
    },
  },
} as const;

const Tabs = React.memo(
  ({
    options,
    activeTab,
    onTabChange,
    size = 'md',
    color = 'primary',
    variant = 'fulled',
    className,
    'aria-label': ariaLabel = 'Tab navigation',
  }: TabsProps) => {
    const sizeClass = SIZE_CLASSES[size];
    const colorClasses = COLOR_CLASSES[color][variant];

    const { focusedIndex, tabRefs, handleKeyDown, handleTabClick } = useTabsState({
      options,
      activeTab,
      onTabChange,
    });

    return (
      <div
        className={cn('flex rounded-full p-xs w-full', colorClasses.container, className)}
        role="tablist"
        aria-label={ariaLabel}
      >
        {options.map((option, index) => {
          const isActive = option.key === activeTab;
          const isFocused = index === focusedIndex;

          return (
            <button
              key={option.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(option, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'rounded-full transition-all duration-200',
                'focus:outline-none overflow-hidden',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                sizeClass,
                'flex-1 min-w-0',
                isActive ? colorClasses.active : colorClasses.inactive,
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${option.key}`}
              tabIndex={isFocused ? 0 : -1}
              disabled={option.disabled}
            >
              <span className="block truncate text-center w-full">{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;

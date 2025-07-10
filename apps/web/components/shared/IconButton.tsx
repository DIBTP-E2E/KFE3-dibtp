import type { ElementType } from 'react';

import { Icon } from '@repo/ui/components';
import type { IconName, IconSize } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

interface IconButtonOwnProps<T extends ElementType = 'button'> {
  // div, span은 react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용.
  // Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거됨. <a> 태그 사용 권장. 불 필요한 div, span 사용 방지.
  as?: T;
  iconName: IconName;
  iconSize: IconSize;
  ariaLabel: string;
  color: 'dark' | 'light' | 'primary';
  variant: 'border' | 'bg';
  buttonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

type IconButtonProps<T extends ElementType = 'button'> = IconButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof IconButtonOwnProps<T>>;

export type { IconButtonProps };

const COLORS = {
  light: {
    bg: 'bg-bg-base text-text-base',
    border: 'border border-border-base text-text-base',
  },
  dark: {
    bg: 'bg-bg-dark text-text-inverse',
    border: 'border border-border-inverse text-text-inverse',
  },
  primary: {
    bg: 'bg-bg-primary text-text-inverse',
    border: 'border border-border-primary text-text-primary',
  },
} as const;

const SIZES = {
  xs: 'w-[28px] h-[28px]',
  sm: 'w-[40px] h-[40px]',
  md: 'w-[44px] h-[44px]',
  lg: 'w-[48px] h-[48px]',
  xl: 'w-[56px] h-[56px]',
} as const;

const IconButton = <T extends ElementType = 'button'>({
  iconName,
  iconSize,
  ariaLabel,
  as = 'button' as T,
  color,
  variant,
  buttonSize,
  className,
  ...restprops
}: IconButtonProps<T>) => {
  const Component = (as || 'button') as ElementType;

  const sizeClass = SIZES[buttonSize];
  const colorClass = COLORS[color][variant];

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        sizeClass,
        colorClass,
        className
      )}
      aria-label={ariaLabel}
      {...restprops}
    >
      <Icon name={iconName} size={iconSize} />
    </Component>
  );
};

export default IconButton;

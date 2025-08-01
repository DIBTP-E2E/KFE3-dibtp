import type { ElementType } from 'react';

import { Icon } from '@ui/components';
import type { IconName, IconSize } from '@ui/components';
import { cn } from '@ui/utils/cn';

export type IconButtonColor =
  | 'darkMode'
  | 'lightMode'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'error';
export type IconButtonVariant = 'fulled' | 'outlined';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconButtonOwnProps<T extends ElementType = 'button'> {
  // div, span은 react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용.
  // Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거됨. <a> 태그 사용 권장. 불 필요한 div, span 사용 방지.
  as?: T;

  // 스타일 정의
  color: IconButtonColor;
  variant: IconButtonVariant;
  buttonSize: IconButtonSize;
  className?: string;
  isTransparent?: boolean;

  // 아이콘 정의
  iconName: IconName;
  iconSize: IconSize;
  ariaLabel: string;
}

type IconButtonProps<T extends ElementType = 'button'> = IconButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof IconButtonOwnProps<T>>;

export type { IconButtonProps };

const SIZES: Record<IconButtonSize, string> = {
  xs: 'w-[32px] h-[32px]',
  sm: 'w-[40px] h-[40px]',
  md: 'w-[44px] h-[44px]',
  lg: 'w-[48px] h-[48px]',
  xl: 'w-[56px] h-[56px]',
} as const;

const COLORS: Record<IconButtonColor, Record<IconButtonVariant, string>> = {
  lightMode: {
    fulled: 'bg-bg-base text-text-base',
    outlined: 'border border-border-base text-text-base',
  },
  darkMode: {
    fulled: 'bg-bg-dark text-text-inverse',
    outlined: 'border border-border-inverse text-text-inverse',
  },
  primary: {
    fulled: 'bg-bg-primary text-text-inverse',
    outlined: 'border border-border-primary text-text-primary',
  },
  secondary: {
    fulled: 'bg-bg-secondary text-text-inverse',
    outlined: 'bg-bg-light border border-border-secondary text-text-secondary',
  },
  danger: {
    fulled: 'bg-bg-danger text-text-inverse',
    outlined: 'bg-bg-light border border-border-danger text-text-danger',
  },
  success: {
    fulled: 'bg-bg-success text-text-inverse',
    outlined: 'bg-bg-light border border-border-success text-text-success',
  },
  error: {
    fulled: 'bg-bg-error text-text-inverse',
    outlined: 'bg-bg-light border border-border-error text-text-error',
  },
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
  isTransparent = false,
  ...restprops
}: IconButtonProps<T>) => {
  const Component = (as || 'button') as ElementType;

  const sizeClass = SIZES[buttonSize];
  const colorClass = !isTransparent ? COLORS[color][variant] : 'bg-transparent';

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center rounded-full cursor-pointer',
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

export const ICON_BUTTON_COLORS_KEYS = Object.keys(COLORS) as IconButtonColor[];
export const ICON_BUTTON_VARIANTS_KEYS = Object.keys(COLORS.lightMode) as IconButtonVariant[];
export const ICON_BUTTON_SIZES_KEYS = Object.keys(SIZES) as IconButtonSize[];

export default IconButton;

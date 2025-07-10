import type { ElementType } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonOwnProps<T extends ElementType = 'button'> {
  children: React.ReactNode;

  // div, span은 react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용.
  // Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거됨. <a> 태그 사용 권장. 불 필요한 div, span 사용 방지.
  as?: T;

  // 스타일 정의
  color?: 'primary' | 'secondary' | 'danger';
  variant?: 'fulled' | 'outlined';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export type { ButtonProps };

const SIZES = {
  sm: 'font-style-small px-sm h-[32px]',
  md: 'font-style-medium px-md h-[44px]',
  lg: 'font-style-large px-lg h-[48px]',
  xl: 'font-style-extra-large px-lg h-[60px]',
} as const;

const ROUNDEDS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

const COLORS = {
  primary: {
    fulled: 'bg-bg-primary text-text-inverse',
    outlined: 'bg-white border border-border-primary text-text-primary',
  },
  secondary: {
    fulled: 'bg-bg-secondary text-text-inverse',
    outlined: 'bg-white border border-border-secondary text-text-secondary',
  },
  danger: {
    fulled: 'bg-bg-danger text-text-inverse',
    outlined: 'bg-white border border-border-danger text-text-danger',
  },
} as const;

const Button = <T extends ElementType = 'button'>({
  as = 'button' as T,
  children,
  color = 'primary',
  variant = 'fulled',
  size = 'xl',
  rounded = 'full',
  className,
  isDisabled = false,
  isFullWidth = true,
  ...restprops
}: ButtonProps<T>) => {
  const Component = (as || 'button') as ElementType;

  const sizeClass = SIZES[size];
  const colorClass = COLORS[color][variant];
  const roundedClass = ROUNDEDS[rounded];

  return (
    <Component
      className={cn(
        'flex items-center justify-center gap-x-sm',
        sizeClass,
        colorClass,
        roundedClass,
        className,
        isFullWidth && 'w-full',
        isDisabled && 'bg-bg-disabled text-text-disabled border-border-disabled'
      )}
      disabled={as === 'button' ? isDisabled : undefined}
      {...restprops}
    >
      {children}
    </Component>
  );
};

Button.displayName = 'Button';

export default Button;

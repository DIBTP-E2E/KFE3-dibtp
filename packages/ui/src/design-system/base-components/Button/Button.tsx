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
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export type { ButtonProps };

const DEFAULT_CLASSES = 'flex items-center justify-center gap-x-sm';
const SIZE_CLASSES = {
  sm: 'font-style-small px-sm h-[32px]',
  md: 'font-style-medium px-md h-[40px]',
  lg: 'font-style-large px-lg h-[48px]',
};
const ROUNDED_CLASSES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};
const COLOR_CLASSES = {
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
};

const Button = <T extends ElementType = 'button'>({
  as = 'button' as T,
  children,
  color = 'primary',
  variant = 'fulled',
  size = 'lg',
  rounded = 'full',
  className,
  isDisabled = false,
  isFullWidth = true,
  ...restprops
}: ButtonProps<T>) => {
  const Component = (as || 'button') as ElementType;

  const commonClasses = cn(
    DEFAULT_CLASSES,
    SIZE_CLASSES[size],
    COLOR_CLASSES[color][variant],
    ROUNDED_CLASSES[rounded],
    className,
    isFullWidth && 'w-full',
    isDisabled && 'bg-bg-disabled text-text-disabled border-border-disabled'
  );

  return (
    <Component
      className={commonClasses}
      disabled={as === 'button' ? isDisabled : undefined}
      {...restprops}
    >
      {children}
    </Component>
  );
};

Button.displayName = 'Button';

export default Button;

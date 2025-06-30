import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // 기본 스타일
          'w-full border rounded-full',

          // 크기별 스타일
          {
            'px-sm py-xs font-style-small': size === 'sm',
            'px-md py-sm font-style-medium': size === 'md',
            'px-lg py-md font-style-large': size === 'lg',
          },

          'placeholder-text-disabled disabled:cursor-not-allowed',
          'transition-all focus:outline-none focus:ring-1',

          // variant별 스타일
          {
            // 기본 상태
            'border-border-form text-text-base bg-bg-light': variant === 'default',
            'focus:ring-border-primary focus:border-border-primary': variant === 'default',

            // 에러 상태
            'border-border-error text-text-error bg-bg-light': variant === 'error',
            'focus:ring-border-error focus:border-border-error': variant === 'error',

            // 성공 상태
            'border-border-success text-text-success bg-bg-light': variant === 'success',
            'focus:ring-border-success focus:border-border-success': variant === 'success',
          },

          // 비활성 상태
          {
            'bg-bg-disabled border-border-disabled': props.disabled,
          },

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

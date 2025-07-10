import type { ElementType } from 'react';

import { Icon } from '@repo/ui/components';
import type { IconName } from '@repo/ui/components';
import { cn } from '@repo/ui/utils/cn';

interface IconButtonOwnProps<T extends ElementType = 'button'> {
  // div, span은 react-router-dom의 <Link>와 함께 사용할 때 <a> 태그 중복 방지를 위해 사용.
  // Next.js의 <Link>는 자식이 <a> 태그일 경우 a 요소 중복이 자동 제거됨. <a> 태그 사용 권장. 불 필요한 div, span 사용 방지.
  as?: T;
  iconName: IconName;
  ariaLabel: string;
  color?: 'dark' | 'light' | 'primary';
  variant?: 'border' | 'bg';
  className?: string;
}

type IconButtonProps<T extends ElementType = 'button'> = IconButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof IconButtonOwnProps<T>>;

export type { IconButtonProps };

const STYLE = {
  border: {
    light: 'border border-border-base text-text-base',
    dark: 'border border-border-inverse text-text-inverse',
    primary: 'border border-border-primary text-text-primary',
  },
  bg: {
    light: 'bg-bg-base text-text-base',
    dark: 'bg-bg-dark text-text-inverse',
    primary: 'bg-bg-primary text-text-inverse',
  },
};

const IconButton = <T extends ElementType = 'button'>({
  iconName,
  ariaLabel,
  as = 'button' as T,
  color,
  variant,
  className,
  ...restprops
}: IconButtonProps<T>) => {
  const Component = (as || 'button') as ElementType;

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center w-[40px] h-[40px] rounded-full',
        // STYLE[variant][color],
        STYLE.bg.light,
        className
      )}
      aria-label={ariaLabel}
      {...restprops}
    >
      <Icon name={iconName} size="sm" />
    </Component>
  );
};

export default IconButton;

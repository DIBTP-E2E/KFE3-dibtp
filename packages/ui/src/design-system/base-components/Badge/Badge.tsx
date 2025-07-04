import { cn } from '@/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  color: 'primary' | 'secondary' | 'danger' | 'success' | 'disabled';
  variant?: 'fulled' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const COLOR_CLASSES = {
  primary: {
    fulled: 'bg-bg-primary text-text-inverse',
    inverted: 'bg-white text-text-primary',
  },
  secondary: {
    fulled: 'bg-bg-secondary text-text-inverse',
    inverted: 'bg-white text-text-secondary',
  },
  danger: {
    fulled: 'bg-bg-danger text-text-inverse',
    inverted: 'bg-white text-text-danger',
  },
  success: {
    fulled: 'bg-bg-success text-text-inverse',
    inverted: 'bg-white text-text-success',
  },
  disabled: {
    fulled: 'bg-bg-disabled text-text-inverse',
    inverted: 'bg-white text-text-info',
  },
};
const SIZE_CLASSES = {
  sm: 'font-style-medium h-[24px]',
  md: 'font-style-large h-[30px]',
  lg: 'font-style-extra-large h-[36px]',
};

const Badge = ({
  children,
  color,
  variant = 'fulled',
  size = 'sm',
  className = '',
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'gap-xs inline-flex items-center justify-center shrink-0 overflow-hidden px-3 py-1 rounded-full',
        COLOR_CLASSES[color][variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

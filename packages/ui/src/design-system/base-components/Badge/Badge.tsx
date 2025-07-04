import { cn } from '@/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  color: 'primary' | 'secondary' | 'danger' | 'success' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const COLOR_CLASSES = {
  primary: 'bg-bg-primary text-text-inverse',
  secondary: 'bg-bg-secondary text-text-inverse',
  danger: 'bg-bg-danger text-text-inverse',
  success: 'bg-bg-success text-text-inverse',
  disabled: 'bg-bg-disabled text-text-inverse',
};

const SIZE_CLASSES = {
  sm: 'font-style-medium h-[24px]',
  md: 'font-style-large h-[30px]',
  lg: 'font-style-extra-large h-[36px]',
};

const Badge = ({ children, color, size = 'sm', className = '', ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'gap-xs inline-flex items-center justify-center shrink-0 overflow-hidden px-3 py-1 rounded-full',
        COLOR_CLASSES[color],
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

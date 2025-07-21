import { cn } from '@ui/utils/cn';
import { ICONS } from './assets/Icons';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor =
  | 'default'
  | 'inverse'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'error';

export type IconName = keyof typeof ICONS;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: IconSize;
  color?: IconColor;
  className?: string;
  name: IconName;
}

export const COLORS = {
  default: 'text-text-inherit',
  inverse: 'text-text-inverse',
  info: 'text-text-info',
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  success: 'text-text-success',
  danger: 'text-text-danger',
  error: 'text-text-error',
} as const;

export const SIZES = {
  xs: 'w-[18px] h-[18px]',
  sm: 'w-[20px] h-[20px]',
  md: 'w-[24px] h-[24px]',
  lg: 'w-[28px] h-[28px]',
  xl: 'w-[32px] h-[32px]',
} as const;

export const Icon = ({ name, size = 'md', color = 'default', className, ...props }: IconProps) => {
  const IconComponent = ICONS[name];

  const sizeClass = SIZES[size];
  const colorClass = COLORS[color];

  if (IconComponent == undefined) return null;

  return <IconComponent className={cn(sizeClass, colorClass, className)} {...props} />;
};

export const ICON_NAME_KEYS = Object.keys(ICONS) as IconName[];
export const ICON_COLOR_KEYS = Object.keys(COLORS) as IconColor[];
export const ICON_SIZE_KEYS = Object.keys(SIZES) as IconSize[];

export default Icon;

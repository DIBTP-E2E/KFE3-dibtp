import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { cn } from '@/utils/cn';

export interface PasswordToggleProps {
  showPassword: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PasswordToggle = ({
  showPassword,
  onToggle,
  disabled = false,
  size = 'md',
}: PasswordToggleProps) => {
  const getPositionStyles = () => {
    return {
      'right-2': size === 'sm',
      'right-3': size === 'md',
      'right-4': size === 'lg',
    };
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 flex items-center justify-center',
        'text-text-info hover:text-text-base transition-colors duration-[--transition-duration-fast]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        getPositionStyles()
      )}
      disabled={disabled}
      aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
    >
      {showPassword ? (
        <MdVisibilityOff className="w-5 h-5" />
      ) : (
        <MdVisibility className="w-5 h-5" />
      )}
    </button>
  );
};

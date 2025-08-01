import { Toaster } from 'sonner';
import { type ReactNode } from 'react';
import { cn } from '@ui/utils/cn';
import { Icon } from '../Icons';

export interface ToastProviderProps {
  /** 토스트 테마 설정 */
  theme?: 'light' | 'dark' | 'system';

  /** 토스트 위치 설정 */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

  /** 토스트 지속 시간 (ms) */
  duration?: number;

  /** 토스트 간격 */
  gap?: number;

  /** 토스트 확장 여부 */
  expand?: boolean;

  /** 닫기 버튼 표시 여부 */
  closeButton?: boolean;

  /** 최대 토스트 개수 */
  visibleToasts?: number;

  /** 커스텀 클래스명 */
  className?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessageProps {
  /** 토스트 메시지 */
  message: string | ReactNode;

  /** 토스트 타입 */
  type: ToastType;

  /** 액션 버튼 */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** 취소 버튼 */
  cancel?: {
    label: string;
    onClick?: () => void;
  };
}

export interface ToastOptions {
  /** 토스트 지속 시간 (ms) */
  duration?: number;

  /** 토스트 ID (중복 방지용) */
  id?: string;

  /** 토스트 위치 (개별 설정) */
  position?: ToastProviderProps['position'];

  /** 액션 버튼 */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** 취소 버튼 */
  cancel?: {
    label: string;
    onClick?: () => void;
  };
}

const SuccessIcon = () => <Icon name="HeartFill" color="inverse" size="sm" />;
const ErrorIcon = () => <Icon name="Cancel" color="inverse" size="sm" />;
const WarningIcon = () => <Icon name="WarningFill" color="default" size="sm" />;
const InfoIcon = () => <Icon name="Bell" color="inverse" size="sm" />;

/** Toast 메시지 컴포넌트 */
export const ToastMessage = ({ message, type, action, cancel }: ToastMessageProps) => {
  const bgColorClass = {
    success: 'bg-bg-success',
    error: 'bg-bg-error',
    warning: 'bg-bg-danger',
    info: 'bg-bg-primary',
  }[type];

  const textColorClass = {
    success: 'text-text-inverse',
    error: 'text-text-inverse',
    warning: 'text-text-inverse',
    info: 'text-text-inverse',
  }[type];

  const IconComponent = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon,
  }[type];

  return (
    <div
      className={cn(
        'flex items-center gap-md px-lg py-md rounded-xl shadow-lg',
        bgColorClass,
        textColorClass
      )}
    >
      <div className="flex-shrink-0">
        <IconComponent />
      </div>

      <div className="font-style-paragraph font-bold flex-1">{message}</div>
      {(action || cancel) && (
        <div className="flex gap-xs ml-md">
          {cancel && (
            <button
              type="button"
              onClick={cancel.onClick}
              className="font-style-small px-sm py-xs rounded bg-white/20 hover:bg-white/30 transition-colors"
            >
              {cancel.label}
            </button>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="font-style-small px-sm py-xs rounded bg-white/20 hover:bg-white/30 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Toast Provider 컴포넌트
 * 앱의 최상단에서 사용하여 토스트 시스템을 활성화합니다.
 */
export const ToastProvider = ({
  theme = 'system',
  position = 'bottom-center',
  duration = 4000,
  gap = 14,
  expand = false,
  closeButton = false,
  visibleToasts = 3,
  className,
}: ToastProviderProps) => {
  return (
    <Toaster
      theme={theme}
      position={position}
      duration={duration}
      gap={gap}
      expand={expand}
      closeButton={closeButton}
      visibleToasts={visibleToasts}
      className={cn(className)}
    />
  );
};

export const Toast = ToastProvider;
export default ToastProvider;

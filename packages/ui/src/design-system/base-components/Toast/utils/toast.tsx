'use client';

import { toast as sonnerToast } from 'sonner';
import { type ReactNode } from 'react';
import { ToastMessage } from '../Toast';
import type { ToastOptions } from '../Toast';

/** 성공 토스트 표시 */
const success = (message: string | ReactNode, options?: ToastOptions) => {
  return sonnerToast.custom(
    () => (
      <ToastMessage
        message={message}
        type="success"
        action={options?.action}
        cancel={options?.cancel}
      />
    ),
    {
      duration: options?.duration || 3000,
      id: options?.id,
      position: options?.position,
    }
  );
};

/** 에러 토스트 표시 */
const error = (message: string | ReactNode, options?: ToastOptions) => {
  return sonnerToast.custom(
    () => (
      <ToastMessage
        message={message}
        type="error"
        action={options?.action}
        cancel={options?.cancel}
      />
    ),
    {
      duration: options?.duration || 3000,
      id: options?.id,
      position: options?.position,
    }
  );
};

/** 경고 토스트 표시 */
const warning = (message: string | ReactNode, options?: ToastOptions) => {
  return sonnerToast.custom(
    () => (
      <ToastMessage
        message={message}
        type="warning"
        action={options?.action}
        cancel={options?.cancel}
      />
    ),
    {
      duration: options?.duration || 3000,
      id: options?.id,
      position: options?.position,
    }
  );
};

/** 정보 토스트 표시 */
const info = (message: string | ReactNode, options?: ToastOptions) => {
  return sonnerToast.custom(
    () => (
      <ToastMessage
        message={message}
        type="info"
        action={options?.action}
        cancel={options?.cancel}
      />
    ),
    {
      duration: options?.duration || 3000,
      id: options?.id,
      position: options?.position,
    }
  );
};

/** 로딩 토스트 표시 */
const loading = (
  message: string | ReactNode,
  options?: Omit<ToastOptions, 'action' | 'cancel'>
) => {
  return sonnerToast.loading(message, {
    duration: options?.duration || Infinity,
    id: options?.id,
    position: options?.position,
  });
};

/** Promise 기반 토스트 */
function promise<T>(
  promiseParam: Promise<T> | (() => Promise<T>),
  messages: {
    loading: string | ReactNode;
    success: string | ReactNode | ((data: T) => string | ReactNode);
    error: string | ReactNode | ((error: Error) => string | ReactNode);
  },
  options?: ToastOptions
): Promise<T> {
  const loadingId = sonnerToast.loading(messages.loading);

  const executePromise = typeof promiseParam === 'function' ? promiseParam() : promiseParam;

  return executePromise
    .then((data) => {
      const successMessage =
        typeof messages.success === 'function' ? messages.success(data) : messages.success;

      sonnerToast.dismiss(loadingId);
      sonnerToast.custom(
        () => (
          <ToastMessage
            message={successMessage}
            type="success"
            action={options?.action}
            cancel={options?.cancel}
          />
        ),
        { duration: options?.duration || 3000 }
      );

      return data;
    })
    .catch((err) => {
      const errorMessage =
        typeof messages.error === 'function' ? messages.error(err) : messages.error;

      sonnerToast.dismiss(loadingId);
      sonnerToast.custom(
        () => (
          <ToastMessage
            message={errorMessage}
            type="error"
            action={options?.action}
            cancel={options?.cancel}
          />
        ),
        { duration: options?.duration || 3000 }
      );

      throw err;
    });
}

/** 특정 토스트 닫기 */
const dismiss = (id?: string | number) => {
  sonnerToast.dismiss(id);
};

/** 모든 토스트 닫기 */
const dismissAll = () => {
  sonnerToast.dismiss();
};

/**
 * 토스트 유틸리티 함수
 * 예전 프로젝트와 동일한 패턴으로 구현
 */
export const toast = {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  dismiss,
  dismissAll,
};

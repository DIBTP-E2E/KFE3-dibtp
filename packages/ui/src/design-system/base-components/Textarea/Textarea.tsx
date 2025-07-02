import { forwardRef, useId } from 'react';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: string;
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      variant = 'default',
      size = 'md',
      resize = 'none',
      minRows = 3,
      maxRows,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const textareaId = useId();
    const errorId = error ? `${textareaId}-error` : undefined;

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return 'px-sm py-xs font-style-small';
        case 'lg':
          return 'px-lg py-md font-style-large';
        default:
          return 'px-md py-sm font-style-medium';
      }
    };

    const getVariantStyles = () => {
      const currentVariant = error ? 'error' : variant;
      switch (currentVariant) {
        case 'error':
          return 'border-border-error text-text-error focus:ring-border-error focus:border-border-error';
        default:
          return 'border-border-form text-text-base focus:ring-border-primary focus:border-border-primary';
      }
    };

    const getResizeClass = () => {
      switch (resize) {
        case 'none':
          return 'resize-none';
        case 'horizontal':
          return 'resize-x';
        case 'both':
          return 'resize';
        default:
          return 'resize-y';
      }
    };

    const getRowsProps = () => {
      const rowsProps: { rows?: number; style?: React.CSSProperties } = {};

      if (minRows) {
        rowsProps.rows = minRows;
      }

      if (maxRows) {
        rowsProps.style = {
          ...rowsProps.style,
          maxHeight: `${maxRows * 1.5}em`, // 대략적인 행 높이 계산
        };
      }

      return rowsProps;
    };

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full border rounded-lg
            placeholder-text-disabled disabled:cursor-not-allowed
            transition-all
            focus:outline-none focus:ring-1
            ${getSizeStyles()}
            ${getVariantStyles()}
            ${getResizeClass()}
            ${disabled ? 'bg-bg-disabled border-border-disabled' : 'bg-bg-light'}
            ${className || ''}
          `}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          {...getRowsProps()}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="mt-xs font-style-small text-text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

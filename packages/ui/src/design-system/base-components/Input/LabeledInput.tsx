import { forwardRef, useId } from 'react';
import { Input, type InputProps } from './Input';
import { InputLabel } from './components/InputLabel';
import { InputMessage } from './components/InputMessage';

export interface LabeledInputProps extends InputProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, required = false, error, helperText, disabled = false, className, ...props }, ref) => {
    const inputId = useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText && !error ? `${inputId}-helper` : undefined;

    const getAriaDescribedBy = () => {
      const ids = [];
      if (errorId) ids.push(errorId);
      if (helperTextId) ids.push(helperTextId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    };

    return (
      <div className="w-full">
        {label && (
          <InputLabel htmlFor={inputId} required={required}>
            {label}
          </InputLabel>
        )}

        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            variant={error ? 'error' : 'default'}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={getAriaDescribedBy()}
            className={className}
            {...props}
          />

          {error && (
            <InputMessage id={errorId} type="error">
              {error}
            </InputMessage>
          )}

          {helperText && !error && (
            <InputMessage id={helperTextId} type="helper">
              {helperText}
            </InputMessage>
          )}
        </div>
      </div>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

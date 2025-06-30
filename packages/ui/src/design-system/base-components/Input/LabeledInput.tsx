import { forwardRef, useId } from 'react';
import { Input, type InputProps } from './Input';
import { Label } from '../Label';
import { FormMessage } from '../FormMessage';

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
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
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
            <FormMessage id={errorId} type="error">
              {error}
            </FormMessage>
          )}

          {helperText && !error && (
            <FormMessage id={helperTextId} type="helper">
              {helperText}
            </FormMessage>
          )}
        </div>
      </div>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

import { forwardRef, useId } from 'react';
import { Textarea, type TextareaProps } from './Textarea';
import { Label } from '../Label';
import { FormMessage } from '../FormMessage';

export interface LabeledTextareaProps extends TextareaProps {
  label?: string;
  helperText?: string;
  required?: boolean;
}

export const LabeledTextarea = forwardRef<HTMLTextAreaElement, LabeledTextareaProps>(
  ({ label, error, helperText, required = false, disabled = false, className, ...props }, ref) => {
    const textareaId = useId();
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperTextId = helperText && !error ? `${textareaId}-helper` : undefined;

    const getAriaDescribedBy = () => {
      const ids = [];
      if (errorId) ids.push(errorId);
      if (helperTextId) ids.push(helperTextId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    };

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        )}

        <div className="relative">
          <Textarea
            ref={ref}
            id={textareaId}
            error={error}
            disabled={disabled}
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

LabeledTextarea.displayName = 'LabeledTextarea';

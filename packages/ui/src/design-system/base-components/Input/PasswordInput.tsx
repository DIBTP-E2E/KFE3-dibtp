import { forwardRef, useId } from 'react';
import { Input, type InputProps } from './Input';
import { PasswordToggle } from './components/PasswordToggle';
import { useInputState } from './hooks/useInputState';
import { cn } from '../../../utils/cn';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  error?: boolean;
  containerClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error = false, containerClassName, disabled = false, className, ...props }, ref) => {
    const { showPassword, handleTogglePassword, getInputType } = useInputState({
      type: 'password',
    });
    const inputId = useId();

    return (
      <div className={cn('relative', containerClassName)}>
        <Input
          ref={ref}
          id={inputId}
          type={getInputType()}
          variant={error ? 'error' : 'default'}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          className={className}
          {...props}
        />

        <PasswordToggle
          showPassword={showPassword}
          onToggle={handleTogglePassword}
          disabled={disabled}
          size={props.size}
        />
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

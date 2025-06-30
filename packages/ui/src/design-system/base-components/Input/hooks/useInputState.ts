import { useState } from 'react';

export interface UseInputStateProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'search';
  defaultValue?: string;
}

export const useInputState = ({ type, defaultValue = '' }: UseInputStateProps = {}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    return type === 'password' && showPassword ? 'text' : type;
  };

  const isPasswordType = type === 'password';

  return {
    showPassword,
    value,
    setValue,
    handleTogglePassword,
    getInputType,
    isPasswordType,
  };
};

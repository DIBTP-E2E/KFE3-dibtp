import { MdCheckCircle, MdInfo } from 'react-icons/md';

export interface InputMessageProps {
  id?: string;
  type: 'error' | 'success' | 'helper';
  children: React.ReactNode;
}

export const InputMessage = ({ id, type, children }: InputMessageProps) => {
  if (type === 'error') {
    return (
      <p id={id} role="alert" className="mt-xs font-style-small text-text-error">
        {children}
      </p>
    );
  }

  if (type === 'success') {
    return (
      <div className="mt-xs flex items-center gap-xs">
        <MdCheckCircle className="w-4 h-4 text-text-success" />
        <span className="font-style-small text-text-success">{children}</span>
      </div>
    );
  }

  if (type === 'helper') {
    return (
      <p id={id} className="mt-xs font-style-small text-text-info flex items-center gap-xs">
        <MdInfo className="w-4 h-4" />
        {children}
      </p>
    );
  }

  return null;
};

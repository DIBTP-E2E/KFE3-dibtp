import { cn } from '../../../../utils/cn';

export interface InputLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const InputLabel = ({ htmlFor, children, required = false, className }: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block font-style-medium text-text-base mb-sm', className)}
    >
      {children}
      {required && <span className="text-text-error ml-xs">*</span>}
    </label>
  );
};

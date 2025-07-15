import { cn } from '@repo/ui/utils/cn';

export interface HeaderContainerProps {
  className?: string;
  children: React.ReactNode;
}

const HeaderContainer = ({ children, className }: HeaderContainerProps) => {
  return (
    <header
      className={cn(
        'flex items-center justify-center',
        'z-50',
        'px-container py-sm',
        'h-[56px] bg-bg-light border-b border-border-base',
        className
      )}
    >
      {children}
    </header>
  );
};

export default HeaderContainer;

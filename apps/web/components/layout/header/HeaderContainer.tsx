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
        'z-50 fixed top-0 left-1/2 transform -translate-x-1/2',
        'px-container py-sm w-full md:max-w-container',
        'h-[56px] bg-bg-light border-b border-border-base',
        className
      )}
    >
      {children}
    </header>
  );
};

export default HeaderContainer;

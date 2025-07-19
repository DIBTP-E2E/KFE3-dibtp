import { cn } from '@repo/ui/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main className={cn('w-full px-container flex-1 overflow-y-auto', className)}>{children}</main>
  );
};

export default PageContainer;

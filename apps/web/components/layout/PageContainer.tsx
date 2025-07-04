import { cn } from '@repo/ui/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  hasTopNavigation?: boolean;
  hasBottomNavigation?: boolean;
}

const PageContainer = ({
  children,
  className,
  hasTopNavigation = false,
  hasBottomNavigation = false,
}: PageContainerProps) => {
  return (
    <main
      className={cn(
        'w-full px-lg overflow-y-auto',
        hasTopNavigation && 'mt-14',
        hasBottomNavigation && 'mb-16',
        className
      )}
    >
      {children}
    </main>
  );
};

export default PageContainer;

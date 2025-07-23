import { TopNavigation, PageContainer } from '@/components/layout';

interface SalesLayoutProps {
  children: React.ReactNode;
}

const SalesLayout = ({ children }: SalesLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="출품내역"
        showTitle
        showBackButton
        showSearchButton={false}
        showAlarmButton={false}
      />
      <PageContainer className="py-lg">{children}</PageContainer>
    </div>
  );
};

export default SalesLayout;

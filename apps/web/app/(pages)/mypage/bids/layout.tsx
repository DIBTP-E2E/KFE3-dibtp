import { TopNavigation, PageContainer } from '@web/components/layout';

interface PurchasesLayoutProps {
  children: React.ReactNode;
}

const PurchasesLayout = ({ children }: PurchasesLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="낙찰내역"
        showTitle
        showBackButton
        showSearchButton={false}
        showAlarmButton={false}
      />
      <PageContainer className="py-lg">{children}</PageContainer>
    </div>
  );
};

export default PurchasesLayout;

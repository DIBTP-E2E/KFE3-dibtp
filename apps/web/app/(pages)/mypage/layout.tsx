import { TopNavigation, BottomNavigation, PageContainer } from '@/components/layout';

interface MypageLayoutProps {
  children: React.ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation title="마이페이지" showBackButton={false} />
      <PageContainer
        className="flex-1 py-lg bg-bg-base"
        hasTopNavigation={true}
        hasBottomNavigation={true}
      >
        {children}
      </PageContainer>
      <BottomNavigation />
    </div>
  );
};

export default MypageLayout;

import { TopNavigation, PageContainer } from '@/components/layout';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <TopNavigation
        title="프로필 수정"
        showTitle
        showBackButton
        showSearchButton={false}
        showAlarmButton={false}
      />
      <PageContainer className="py-lg">{children}</PageContainer>
    </div>
  );
};

export default ProfileLayout;

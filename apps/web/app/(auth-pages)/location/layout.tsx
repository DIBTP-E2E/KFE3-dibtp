import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '위치 설정 - 경매 플랫폼',
  description: '거주 지역을 설정하여 주변 경매 정보를 받아보세요.',
};

const LocationLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LocationLayout;

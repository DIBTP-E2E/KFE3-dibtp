import ActivityCard from './ActivityCard';
import MypageSectionCard from './MypageSectionCard';

const ActivityStats = () => {
  // 추후 데이터 연동
  const salesStats = [
    { value: 8, label: '판매중' },
    { value: 12, label: '판매완료' },
  ];

  const purchaseStats = [
    { value: 5, label: '구매완료' },
    { value: 3, label: '관심상품' },
  ];

  return (
    <MypageSectionCard title="활동 통계">
      <div className="grid grid-cols-2 gap-md">
        <ActivityCard
          icon="Export"
          title="판매 활동"
          iconBgColor="bg-bg-primary/80"
          stats={salesStats}
        />
        <ActivityCard
          icon="ShoppingBag"
          title="구매 활동"
          iconBgColor="bg-bg-success/80"
          stats={purchaseStats}
        />
      </div>
    </MypageSectionCard>
  );
};

export default ActivityStats;

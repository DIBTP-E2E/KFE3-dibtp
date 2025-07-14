import { Icon } from '@repo/ui/components';
import type { IconName } from '@repo/ui/components';

interface StatItem {
  value: string | number;
  label: string;
}

interface ActivityCardProps {
  icon: string;
  title: string;
  iconBgColor: string;
  stats: StatItem[];
}

const ActivityCard = ({ icon, title, iconBgColor, stats }: ActivityCardProps) => {
  return (
    <div className="flex flex-col gap-sm p-sm">
      <div className="flex items-center justify-center gap-sm">
        <div className={`w-7 h-7 ${iconBgColor} rounded-md flex items-center justify-center`}>
          <Icon name={icon as IconName} size="sm" color="inverse" />
        </div>
        <h3 className="font-style-medium">{title}</h3>
      </div>
      <div className="flex justify-around">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="font-style-headline-h3 mb-xs">{stat.value}</p>
            <p className="font-style-small text-text-info">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;

import { Icon, type IconName } from '@repo/ui/components';
import Link from 'next/link';

export interface MypageMenuItemProps {
  icon: IconName;
  title: string;
  href: string;
}

const MypageMenuItem = ({ icon, title, href }: MypageMenuItemProps) => {
  return (
    <Link href={href} className="flex items-center justify-between py-sm">
      <div className="flex items-center gap-sm">
        <div className="w-8 h-8 flex items-center justify-center">
          <Icon name={icon} size="sm" color="default" />
        </div>
        <div>
          <h3 className="font-style-medium">{title}</h3>
        </div>
      </div>
      <div className="flex items-center">
        <Icon name="ArrowRight" size="sm" color="default" />
      </div>
    </Link>
  );
};

export default MypageMenuItem;

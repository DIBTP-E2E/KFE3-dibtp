import { cn } from '@repo/ui/utils/cn';

import AlarmButton from './AlarmButton';
import BackButton from './BackButton';
import RegionLabel from './RegionLabel';
import SearchButton from './SearchButton';
interface TopNavigationProps {
  title: string;
  showTitle: boolean;
  region?: string;
  showRegion?: boolean;
  showBackButton: boolean;
  showSearchButton: boolean;
  showAlarmButton: boolean;
}

const TopNavigation = ({
  title,
  showTitle = true,
  region,
  showRegion = false,
  showBackButton,
  showSearchButton,
  showAlarmButton,
}: TopNavigationProps) => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-container z-50 flex items-center justify-center h-14 bg-bg-light border-b border-border-base">
      <h1 className={cn('font-style-headline-h5', !showTitle && 'sr-only')}>{title}</h1>

      <div className="flex absolute left-2">
        {showBackButton && <BackButton />}
        {showRegion && region && <RegionLabel region={region} />}
      </div>

      <div className="flex absolute right-2">
        {showSearchButton && <SearchButton />}
        {showAlarmButton && <AlarmButton />}
      </div>
    </header>
  );
};

export default TopNavigation;

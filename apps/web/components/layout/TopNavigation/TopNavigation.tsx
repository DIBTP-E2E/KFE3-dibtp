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
    <header
      className={cn(
        'flex items-center justify-center',
        'z-50 fixed top-0 left-1/2 transform -translate-x-1/2',
        'px-container py-sm w-full md:max-w-container',
        'h-[56px] bg-bg-light border-b border-border-base'
      )}
    >
      <h1 className={cn('font-style-headline-h5', !showTitle && 'sr-only')}>{title}</h1>

      <div className="flex gap-sm absolute left-[var(--space-container)]">
        {showBackButton && <BackButton />}
        {showRegion && region && <RegionLabel region={region} />}
      </div>

      <div className="flex gap-sm absolute right-[var(--space-container)]">
        {showSearchButton && <SearchButton />}
        {showAlarmButton && <AlarmButton />}
      </div>
    </header>
  );
};

export default TopNavigation;

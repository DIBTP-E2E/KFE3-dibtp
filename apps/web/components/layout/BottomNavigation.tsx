'use client';

import { Icon } from '@repo/ui/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BOTTOM_NAVIGATION_ITEMS } from '@/constants/navigation';

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-container bg-bg-light border-t border-border-base">
      <div className="flex">
        {BOTTOM_NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center h-16 transition-colors ${
                isActive ? 'text-text-accent bg-bg-accent' : 'text-text-muted hover:text-text-base'
              }`}
            >
              <div className="mb-1">
                <Icon name={(isActive ? item.activeIcon : item.icon) as 'Home'} size="md" />
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;

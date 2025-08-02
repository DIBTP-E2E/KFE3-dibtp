'use client';

import { useState } from 'react';

import { Tabs } from '@repo/ui/components';

import { PRODUCT_STATUS, PRODUCT_STATUS_LABELS } from '@web/constants';
import type { ProductStatus } from '@web/types';

import SalesProductList from './SalesProductList';

interface SalesHistoryTabsProps {
  initialTab?: ProductStatus;
}

const TAB_OPTIONS = [
  { key: PRODUCT_STATUS.ACTIVE, label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.ACTIVE] },
  { key: PRODUCT_STATUS.SOLD, label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.SOLD] },
  { key: PRODUCT_STATUS.CANCEL, label: PRODUCT_STATUS_LABELS[PRODUCT_STATUS.CANCEL] },
];

const SalesHistoryTabs = ({ initialTab = PRODUCT_STATUS.ACTIVE }: SalesHistoryTabsProps) => {
  const [activeTab, setActiveTab] = useState<ProductStatus>(initialTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key as ProductStatus);
  };

  return (
    <div className="flex flex-col gap-md">
      <Tabs
        options={TAB_OPTIONS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        size="md"
        color="primary"
        variant="fulled"
      />

      <SalesProductList targetStatus={activeTab} />
    </div>
  );
};

export default SalesHistoryTabs;

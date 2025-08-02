'use client';

import { Button } from '@repo/ui/components';

import { useMyInfo } from '@web/hooks';

const RegionLabel = () => {
  const { region, detailAddress } = useMyInfo();

  return (
    <Button size="sm" color="lightMode" isFullWidth={false}>
      {region} {detailAddress}
    </Button>
  );
};

export default RegionLabel;

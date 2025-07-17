'use client';

import { Button } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';

import { fetchUserRegion } from '@/lib/query/client';

const RegionLabel = () => {
  const { data: region } = useQuery<string | null>({
    queryKey: ['user-region'],
    queryFn: fetchUserRegion,
  });

  return (
    <Button size="sm" color="lightMode" isFullWidth={false}>
      {region}
    </Button>
  );
};

export default RegionLabel;

'use client';

import { Button } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';

import { fetchUserRegion } from '@/services/user/client';

import { USER_REGION_QUERY_KEY } from '@/constants';

const RegionLabel = () => {
  const { data: region } = useQuery<string | null>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  return (
    <Button size="sm" color="lightMode" isFullWidth={false}>
      {region}
    </Button>
  );
};

export default RegionLabel;

'use client';

import { Button } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';

import { USER_REGION_QUERY_KEY } from '@web/constants';
import { fetchUserRegion } from '@web/services/user/client';
import type { UserRegion } from '@web/types';

const RegionLabel = () => {
  const { data } = useQuery<UserRegion>({
    queryKey: USER_REGION_QUERY_KEY,
    queryFn: fetchUserRegion,
  });

  return (
    <Button size="sm" color="lightMode" isFullWidth={false}>
      {data?.region}
    </Button>
  );
};

export default RegionLabel;

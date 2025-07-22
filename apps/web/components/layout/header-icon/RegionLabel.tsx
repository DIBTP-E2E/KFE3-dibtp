'use client';

import { Button } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';

import { fetchMyInfo } from '@/services/my/client';

import { MY_INFO_QUERY_KEY } from '@web/constants';
import type { MyInfoAPIResponse } from '@web/types';

const RegionLabel = () => {
  const { data } = useQuery<MyInfoAPIResponse>({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: fetchMyInfo,
  });

  return (
    <Button size="sm" color="lightMode" isFullWidth={false}>
      {data?.region}
    </Button>
  );
};

export default RegionLabel;

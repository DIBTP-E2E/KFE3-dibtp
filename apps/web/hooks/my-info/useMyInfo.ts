'use client';

import { useQuery } from '@tanstack/react-query';

import { MY_INFO_QUERY_KEY } from '@web/constants';
import { fetchMyInfo } from '@web/services/my/client';

import type { MyInfoAPIResponse } from '@web/types';

export const useMyInfo = (): MyInfoAPIResponse => {
  const { data } = useQuery<MyInfoAPIResponse>({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: fetchMyInfo,
  });

  return {
    region: data?.region ?? '',
    userId: data?.userId ?? '',
    nickname: data?.nickname ?? '',
    profileImage: data?.profileImage ?? '',
  };
};

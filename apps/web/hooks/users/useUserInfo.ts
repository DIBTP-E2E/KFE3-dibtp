'use client';

import { useQuery } from '@tanstack/react-query';

import { USER_INFO_QUERY_KEY } from '@web/constants';
import { fetchUserInfo } from '@web/services/users/client/fetchUserInfo';

import type { MyInfoAPIResponse } from '@web/types';

export const useUserInfo = (userId: string): MyInfoAPIResponse => {
  const { data } = useQuery<MyInfoAPIResponse>({
    queryKey: USER_INFO_QUERY_KEY(userId),
    queryFn: () => fetchUserInfo(userId),
    enabled: !!userId,
  });

  return {
    region: data?.region ?? '',
    userId: data?.userId ?? '',
    nickname: data?.nickname ?? '',
    profileImage: data?.profileImage ?? '',
  };
};

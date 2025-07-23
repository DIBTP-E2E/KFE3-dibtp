// 공통 queryKey 상수

export const MY_INFO_QUERY_KEY = ['my-info'] as const;
export const USER_INFO_QUERY_KEY = (userId: string) => ['user-info', userId] as const;

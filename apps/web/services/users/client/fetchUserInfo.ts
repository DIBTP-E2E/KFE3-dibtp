import { API_ROUTES } from '@web/constants/routes/api';
import type { MyInfoAPIResponse } from '@web/types';

export const fetchUserInfo = async (userId: string): Promise<MyInfoAPIResponse> => {
  const response = await fetch(`${API_ROUTES.USERS}/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return response.json();
};

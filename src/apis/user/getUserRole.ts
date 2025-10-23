import { apiInstance } from '@/apis/apiInstance';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface UserRoleResponse {
  content: {
    isFestivalManagerOrAdmin: boolean;
  };
}

export const getUserRole = async (): Promise<AxiosResponse<UserRoleResponse, ApiErrorResponse>> => {
  return await apiInstance.get<UserRoleResponse>(API_ENDPOINTS.USER_ROLE);
};

export default getUserRole;

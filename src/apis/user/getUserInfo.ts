import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { UserInfoResponse } from '@/types/UserType';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';

export const getUserInfo = async (): Promise<AxiosResponse<UserInfoResponse, ApiErrorResponse>> => {
  return await apiInstance.get<UserInfoResponse>(API_ENDPOINTS.USER_INFO);
};

export default getUserInfo;

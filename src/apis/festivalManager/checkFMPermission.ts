import { apiInstance } from '@/apis/apiInstance';
import { generatePath } from 'react-router-dom';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

interface CheckFMPermissionResponse {
  content: boolean;
}
export const checkFMPermission = async (): Promise<AxiosResponse<CheckFMPermissionResponse>> => {
  return await apiInstance.get<CheckFMPermissionResponse>(
    generatePath(API_ENDPOINTS.FM_PERMISSION_CHECK),
  );
};

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface FMPermissionStatusResponse {
  content: {
    id: number;
    department: string;
    updatedDate: string;
    state: 'PENDING' | 'ACCEPTED' | 'DENIED';
    docsUrls: string[];
  };
}

export const getMyFMPermission = async (): Promise<AxiosResponse<FMPermissionStatusResponse>> => {
  return await apiInstance.get<FMPermissionStatusResponse>(generatePath(API_ENDPOINTS.FM_PERMISSION_MY));
};

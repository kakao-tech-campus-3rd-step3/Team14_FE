import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface FMPermissionResponse {
  content: {
    id: number;
    department: string;
    updatedDate: string;
    state: 'PENDING' | 'ACCEPTED' | 'DENIED';
    docsUrls: string[];
  };
}

export const getMyFMPermission = async (): Promise<AxiosResponse<FMPermissionResponse>> => {
  return await apiInstance.get<FMPermissionResponse>(generatePath(API_ENDPOINTS.FM_PERMISSION_MY));
};

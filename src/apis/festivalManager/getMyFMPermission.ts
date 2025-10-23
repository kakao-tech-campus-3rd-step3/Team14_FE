import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';
import type { ApplicationState } from '@/types/FMPermissionsRequest';

export interface FMPermissionStatusResponse {
  content: {
    id: number;
    department: string;
    updatedDate: string;
    state: ApplicationState;
    docsUrls: string[];
  };
}

export const getMyFMPermission = async (): Promise<AxiosResponse<FMPermissionStatusResponse>> => {
  return await apiInstance.get<FMPermissionStatusResponse>(
    generatePath(API_ENDPOINTS.FM_PERMISSION_MY),
  );
};

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

export interface FMPermissionResponse {
    department: string;
    documents: Array<{
      id: number;
      presignedUrl: string;
    }>;
  }
export async function fetchFMPermission() {
  return await apiInstance.put<FMPermissionResponse>(generatePath(API_ENDPOINTS.FM_PERMISSION_MY));
}
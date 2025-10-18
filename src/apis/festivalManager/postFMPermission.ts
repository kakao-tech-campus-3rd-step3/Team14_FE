import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

export interface PostFMPermissionBody {
  department: string;
  documents: Array<{
    id: number;
    presignedUrl: string;
  }>;
}

export async function postFMPermission(body: PostFMPermissionBody) {
  return await apiInstance.post(generatePath(API_ENDPOINTS.FM_PERMISSION), body);
}

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { FMPermissionRequest } from '@/types/FMPermissionsRequest';

export async function postFMPermission(body: FMPermissionRequest) {
  return await apiInstance.post(generatePath(API_ENDPOINTS.FM_PERMISSION), body);
}

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { FMPermissionResponse } from '@/types/FMPermissionsResponse';

export async function patchFMPermission(body: FMPermissionResponse) {
  return await apiInstance.put<FMPermissionResponse>(generatePath(API_ENDPOINTS.FM_PERMISSION_MY), body);
}

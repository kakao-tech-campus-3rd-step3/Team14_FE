import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { FMPermissionRequest } from '@/types/FMPermissionsRequest';
import type { FMPermissionStatusResponse } from '@/apis/festivalManager/getMyFMPermission';

export async function patchFMPermission(body: FMPermissionRequest) {
  return await apiInstance.patch<FMPermissionStatusResponse>(
    generatePath(API_ENDPOINTS.FM_PERMISSION_MY), 
    body
  );
}
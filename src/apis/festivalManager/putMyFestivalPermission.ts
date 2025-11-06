import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { FestivalPermissionDetailResponse } from '@/apis/festivalManager/getMyFestivalPermissionDetail';

export interface UpdateFestivalPermissionRequest {
  documents: Array<{
    id: number;
    presignedUrl: string;
  }>;
}

export const putMyFestivalPermission = async (
  id: string,
  body: UpdateFestivalPermissionRequest,
): Promise<AxiosResponse<FestivalPermissionDetailResponse>> => {
  return await apiInstance.put<FestivalPermissionDetailResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_PERMISSION_DETAIL, { id }),
    body,
  );
};

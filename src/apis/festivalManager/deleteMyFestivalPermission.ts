import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { FestivalPermissionDetailResponse } from '@/apis/festivalManager/getMyFestivalPermissionDetail';
import type { AxiosResponse } from 'axios';

export const deleteMyFestivalPermission = async (
  id: string,
): Promise<AxiosResponse<FestivalPermissionDetailResponse>> => {
  return await apiInstance.delete<FestivalPermissionDetailResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_PERMISSION_DETAIL, { id }),
  );
};

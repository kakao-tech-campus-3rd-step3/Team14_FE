import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { ApiResponseItem } from '@/apis/apiResponse';
import type { FestivalPermissionItem } from './getMyFestivalPermissions';

export interface FestivalPermissionDetail extends FestivalPermissionItem {
  posterImg: string;
  docs: string[];
}

export type FestivalPermissionDetailResponse = ApiResponseItem<FestivalPermissionDetail>;

export const getMyFestivalPermissionDetail = async (
  id: string,
): Promise<AxiosResponse<FestivalPermissionDetailResponse>> => {
  return await apiInstance.get<FestivalPermissionDetailResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_PERMISSION_DETAIL, { id }),
  );
};

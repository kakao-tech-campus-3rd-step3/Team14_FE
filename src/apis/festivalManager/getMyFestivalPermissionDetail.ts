import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { ApiResponseItem } from '@/apis/apiResponse'; 
import type { ApplicationState } from '@/apis/apiResponse';

export interface FestivalPermissionDetail {
  id: number;
  title: string;
  posterImg: string;
  appliedDate: string;
  state: ApplicationState;
  docs: string[];
}

export type FestivalPermissionDetailResponse = ApiResponseItem<FestivalPermissionDetail>;

export const getMyFestivalPermissionDetail = async (
  id: string
): Promise<AxiosResponse<FestivalPermissionDetailResponse>> => {
  return await apiInstance.get<FestivalPermissionDetailResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_PERMISSION_DETAIL, { id })
  );
};
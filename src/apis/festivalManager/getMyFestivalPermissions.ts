import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';
import type { ApiResponseList } from '@/apis/apiResponse'; 

export type ApplicationState = 'PENDING' | 'ACCEPTED' | 'DENIED';

export interface FestivalPermissionItem {
  id: number;
  title: string;
  appliedDate: string;
  state: ApplicationState;
}

export type MyFestivalPermissionsResponse = ApiResponseList<FestivalPermissionItem>;

export const getMyFestivalPermissions = async (
  page: number = 0,
  size: number = 5
): Promise<AxiosResponse<MyFestivalPermissionsResponse>> => {
  return await apiInstance.get<MyFestivalPermissionsResponse>(
    API_ENDPOINTS.MY_FESTIVAL_PERMISSIONS,
    {
      params: { page, size },
    }
  );
};
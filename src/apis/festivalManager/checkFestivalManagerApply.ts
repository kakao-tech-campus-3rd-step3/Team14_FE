import { apiInstance } from '@/apis/apiInstance';
import { generatePath } from 'react-router-dom';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { AxiosResponse } from 'axios';

interface CheckFestivalManagerApplyResponse {
  content: boolean;
}
export const checkFestivalManagerApply = async (
  festivalId: string,
): Promise<AxiosResponse<CheckFestivalManagerApplyResponse>> => {
  return await apiInstance.get<CheckFestivalManagerApplyResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_MANAGER_APPLY_CHECK, { festivalId }),
  );
};

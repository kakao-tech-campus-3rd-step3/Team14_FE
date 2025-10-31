import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { FestivalUpdateRequest } from '@/types/FestivalFormTypes';
import type { AxiosResponse } from 'axios';

export const patchFestival = async (
  festivalId: string,
  body: FestivalUpdateRequest,
): Promise<AxiosResponse<void>> => {
  return await apiInstance.patch<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_INFO, { festivalId }),
    body,
  );
};
export default patchFestival;

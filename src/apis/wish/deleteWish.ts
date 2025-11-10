import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiResponse';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export const deleteWish = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<void, ApiErrorResponse>> => {
  return await apiInstance.delete<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_WISH_DELETE, { festivalId: params.festivalId }),
  );
};

export default deleteWish;

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface PostWishResponse {
  content: {
    wishId: string;
    festivalId: string;
    title: string;
    areaCode: number;
  };
}

export const postWish = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<PostWishResponse, ApiErrorResponse>> => {
  return await apiInstance.post<PostWishResponse>(
    generatePath(API_ENDPOINTS.FESTIVAL_WISH, { festivalId: params.festivalId }),
  );
};

export default postWish;

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import { generatePath } from 'react-router-dom';

export interface Review {
  reviewId: string;
  reviwerName: string;
  festivalTitle: string;
  content: string;
  score: number;
  imageUrls: string[];
  videoUrl: string;
}
export const getReview = async (params: {
  festivalId: string;
}): Promise<AxiosResponse<ApiResponseList<Review>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Review>>(
    generatePath(API_ENDPOINTS.FESTIVAL_REVIEWS, { festivalId: params.festivalId }),
  );
};

export default getReview;

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseItem, ApiErrorResponse } from '@/apis/apiResponse';
import type { AxiosResponse } from 'axios';
import type { Review } from '@/apis/review/getReview';
import { generatePath } from 'react-router-dom';

export const getSingleReview = async (
  reviewId: number,
): Promise<AxiosResponse<ApiResponseItem<Review>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseItem<Review>>(
    generatePath(API_ENDPOINTS.REVIEW_BY_ID, { reviewId: reviewId.toString() }),
  );
};

export default getSingleReview;

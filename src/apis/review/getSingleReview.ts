import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';
import type { Review } from './getReview';
import type { ApiResponseItem } from '../apiResponse';
import { generatePath } from 'react-router-dom';

export const getSingleReview = async (
  reviewId: number,
): Promise<AxiosResponse<ApiResponseItem<Review>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseItem<Review>>(
    generatePath(API_ENDPOINTS.REVIEW_SINGLE, { reviewId: reviewId.toString() }),
  );
};

export default getSingleReview;

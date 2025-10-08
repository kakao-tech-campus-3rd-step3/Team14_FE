
import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface MyReview {
  reviewId: number;
  reviewerName: string;
  festivalTitle: string;
  content: string;
  score: number;
  imageUrls: string[];
  videoUrl: string;
}

export const getMyReviews = async (page = 0, size = 5): Promise<{ data: ApiResponseList<MyReview> }> => {
  const response = await apiInstance.get(API_ENDPOINTS.MY_REVIEWS, {
    params: { page, size }
  });
  return response.data;
};
import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 5;

export interface MyReview {
  reviewId: number;
  reviewerName: string;
  festivalTitle: string;
  content: string;
  score: number;
  imageUrls: string[];
  videoUrl: string;
}

export const getMyReviews = async (
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
): Promise<{ data: ApiResponseList<MyReview> }> => {
  const data = await apiInstance.get(API_ENDPOINTS.MY_REVIEWS, {
    params: { page, size },
  });
  return data;
};

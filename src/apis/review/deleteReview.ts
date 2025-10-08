import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export const deleteReview = async (reviewId: number) => {
  const response = await apiInstance.delete(API_ENDPOINTS.REVIEW_DELETE, {
    params: { reviewId },
  });
  return response;
};
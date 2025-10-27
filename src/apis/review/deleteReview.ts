import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';

/**
 * 리뷰 삭제를 위한 함수
 * @param reviewId 삭제할 리뷰 ID
 * @returns 삭제 결과
 */
export const deleteReview = async (reviewId: number) => {
  const response = await apiInstance.delete(
    generatePath(API_ENDPOINTS.REVIEW_BY_ID, { reviewId: reviewId.toString() }),
  );
  return response.data;
};

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

/**
 * 리뷰 삭제를 위한 함수
 * @param reviewId 삭제할 리뷰 ID
 * @returns 삭제 결과
 */
export const deleteReview = async (reviewId: number) => {
  const response = await apiInstance.delete(
    API_ENDPOINTS.REVIEW_DELETE.replace(':reviewId', reviewId.toString()),
  );
  return response.data;
};

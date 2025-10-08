import { apiInstance } from '@/apis/apiInstance';
/**
 * 리뷰 삭제를 위한 함수
 * 쿼리 파라미터를 사용하지 않고 직접 경로를 사용하여 삭제를 구현하였습니다.
 * 수정 전, 엔드포인트 추가 후 params 사용한 방식에서 URL치환 안되는 이슈 발생 -> 추후 적절한 방식으로 다시 수정하겠습니다.
 * @param reviewId
 * @returns
 */

export const deleteReview = async (reviewId: number) => {
  const response = await apiInstance.delete(`/api/reviews/${reviewId}`);
  return response.data;
};

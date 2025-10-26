import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface ReviewUpdateRequest {
  content: string;
  score: number;
  imageInfos: MediaInfo[];
  videoInfo?: MediaInfo | null;
}

export const putReview = async (reviewId: number, body: ReviewUpdateRequest) => {
  return await apiInstance.put(API_ENDPOINTS.REVIEW_UPDATE.replace(':reviewId', reviewId.toString()), body);
};
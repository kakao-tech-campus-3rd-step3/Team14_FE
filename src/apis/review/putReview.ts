import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { MediaInfo } from '@/types/Media/MediaInfo';
import { generatePath } from 'react-router-dom';

export interface ReviewUpdateRequest {
  content: string;
  score: number;
  imageInfos: MediaInfo[];
  videoInfo?: MediaInfo | null;
}

export const putReview = async (reviewId: number, body: ReviewUpdateRequest) => {
  return await apiInstance.put(
    generatePath(API_ENDPOINTS.REVIEW_BY_ID, { reviewId: reviewId.toString() }),
    body,
  );
};

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface PostReviewBody {
  content: string;
  score: number;
  imageUrls?: string[];
  videoUrl?: string;
}

export async function postReview(params: { festivalId: string; body: PostReviewBody }) {
  const { festivalId, body } = params;
  const url = API_ENDPOINTS.FESTIVAL_REVIEWS.replace(':festivalId', festivalId);
  const res = await apiInstance.post(url, body);
  return {
    location: res.headers?.location ?? res.headers?.Location ?? '',
    status: res.status,
    data: res.data,
  };
}
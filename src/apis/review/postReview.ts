import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';

export interface PostReviewBody {
    content: string;
    score: number;
    imageInfos: { id: number; presignedUrl: string }[];
    videoInfo?: { id: number; presignedUrl: string };
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
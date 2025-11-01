import type { Festival } from '@/types/FestivalType';
import type { PostFestivalsPickBody } from '@/apis/festivals/postFestivalsPick';

export interface RecommendationFormResponse extends PostFestivalsPickBody {
  userId: number;
}

export interface AIRecommendationHistoryResponse {
  recommendedFestivals: Festival[];
  recommendationFormResponse: RecommendationFormResponse;
}

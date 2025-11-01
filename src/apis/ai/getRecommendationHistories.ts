import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseItem } from '@/apis/apiResponse';
import type { AIRecommendationHistoryResponse } from '@/types/AiRecommendationTypes';
import type { AxiosResponse } from 'axios';

export const getRecommendationHistories = async (): Promise<
  AxiosResponse<ApiResponseItem<AIRecommendationHistoryResponse>>
> => {
  return await apiInstance.get<ApiResponseItem<AIRecommendationHistoryResponse>>(
    API_ENDPOINTS.AI_RECOMMENDATION_HISTORIES,
  );
};

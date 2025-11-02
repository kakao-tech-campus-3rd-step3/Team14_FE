import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseItem } from '@/apis/apiResponse';
import type { AiRecommendationHistoryResponse } from '@/types/AiRecommendationTypes';
import type { AxiosResponse } from 'axios';

export const getRecommendationHistories = async (): Promise<
  AxiosResponse<ApiResponseItem<AiRecommendationHistoryResponse>>
> => {
  return await apiInstance.get<ApiResponseItem<AiRecommendationHistoryResponse>>(
    API_ENDPOINTS.AI_RECOMMENDATION_HISTORIES,
  );
};

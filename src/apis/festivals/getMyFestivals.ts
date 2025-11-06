import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiResponseList } from '@/apis/apiResponse';
import type { Festival } from '@/types/FestivalType';

export const getMyFestivals = async (
  page = 0,
  size = 5,
): Promise<{ data: ApiResponseList<Festival> }> => {
  const data = await apiInstance.get(API_ENDPOINTS.MY_FESTIVALS, {
    params: { page, size },
  });
  return data;
};

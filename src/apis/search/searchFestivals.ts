import { apiInstance } from '@/apis/apiInstance';
import type { ApiResponseList, ApiErrorResponse } from '@/apis/apiResponse';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { Festival } from '@/types/FestivalType';
import type { AxiosResponse } from 'axios';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 5;

/**
 * 페스티벌 검색
 * @param params 검색 파라미터
 * @returns 페스티벌 검색 결과
 * 쿼리 파라미터가 아닌 generatePath 사용 시 아래와 같은 오류를 접함.
 * Required request parameter 'keyword' for method parameter type String is not present
 * 따라서 axios의 params 옵션 사용.
 */
export interface SearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export const searchFestivals = async (
  params: SearchParams,
): Promise<AxiosResponse<ApiResponseList<Festival>, ApiErrorResponse>> => {
  return await apiInstance.get<ApiResponseList<Festival>>(API_ENDPOINTS.FESTIVAL_SEARCH, {
    params: {
      keyword: params.keyword,
      page: params.page ?? DEFAULT_PAGE,
      size: params.size ?? DEFAULT_SIZE,
    },
  } as const);
};

import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import type { ApiErrorResponse } from '@/apis/apiInstance';
import type { AxiosResponse } from 'axios';

export interface JwtExchangeResponse {
  accessToken: string;
}

export const jwtExchange = async (): Promise<
  AxiosResponse<JwtExchangeResponse, ApiErrorResponse>
> => {
  return await apiInstance.post<JwtExchangeResponse>(
    API_ENDPOINTS.JWT_EXCHANGE,
    {},
    {
      withCredentials: true,
    },
  );
};

export default jwtExchange;

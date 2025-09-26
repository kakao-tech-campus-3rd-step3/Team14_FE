import { apiBaseUrl } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { festivalInfoMockData } from '@/mocks/data/festivalInfo.mock';
import { http, HttpResponse } from 'msw';

export const getFestivalsInfoHandler = [
  http.get<{ festivalId: string }>(apiBaseUrl + API_ENDPOINTS.FESTIVAL_INFO, async ({ params }) => {
    const { festivalId } = params;

    if (!festivalId || festivalId === '0') {
      return HttpResponse.json(
        {
          status: 'BAD_REQUEST',
          statusCode: 400,
          message: '존재하지 않는 축제입니다',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      ...festivalInfoMockData,
    });
  }),
];

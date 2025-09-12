import { apiBaseUrl } from '@/apis/instance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { festivalsMockData } from '@/mocks/data/festivals.mock';
import { http, HttpResponse } from 'msw';

export const getFestivalsHandler = [
  http.get<{ areaId: string }>(apiBaseUrl + API_ENDPOINTS.FESTIVALS, async ({ params }) => {
    const { areaId } = params;

    if (!areaId || areaId === '0') {
      return HttpResponse.json(
        {
          status: 'BAD_REQUEST',
          statusCode: 400,
          message: '존재하지 않는 지역입니다',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      ...festivalsMockData,
    });
  }),
];

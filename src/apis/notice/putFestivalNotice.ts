import { apiInstance } from '@/apis/apiInstance';
import API_ENDPOINTS from '@/constants/apiEndpoints';
import { generatePath } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { MediaInfo } from '@/types/Media/MediaInfo';

export interface UpdateFestivalNoticeRequest {
  title: string;
  content: string;
  images: MediaInfo[];
}

/**
 * 축제 공지사항 수정을 위한 API 함수입니다.
 * @param id 공지사항 ID
 * @param body 공지사항 데이터
 * @returns 공지사항 수정 결과
 */
export const putFestivalNotice = async (
  id: string,
  body: UpdateFestivalNoticeRequest,
): Promise<AxiosResponse<void>> => {
  return await apiInstance.put<void>(
    generatePath(API_ENDPOINTS.FESTIVAL_NOTICE_DETAIL, { id }),
    body,
  );
};

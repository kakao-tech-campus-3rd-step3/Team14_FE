import useNav from './useNav';
import { generatePath } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
/**
 * 공지사항 네비게이션 핸들러 훅
 * 공지사항과 관련된 부분에서 사용할 수 있도록 핸들러를 따로 모아뒀습니다.
 * @param festivalId - 축제 ID
 * @returns {Object}
 * - handleCreateNotice: 공지사항 작성 핸들러
 * - handleEditNotice: 공지사항 수정 핸들러
 */
export const useNoticeNavigationHandlers = (festivalId: string) => {
  const { goTo } = useNav();

  const handleCreateNotice = () => {
    goTo(generatePath(ROUTE_PATH.FESTIVAL_NOTICE_CREATE, { festivalId }));
  };

  const handleEditNotice = (noticeId: number) => {
    goTo(
      generatePath(ROUTE_PATH.FESTIVAL_NOTICE_EDIT, {
        festivalId,
        noticeId: noticeId.toString(),
      }),
    );
  };

  return { handleCreateNotice, handleEditNotice };
};

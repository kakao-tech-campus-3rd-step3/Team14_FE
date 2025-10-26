import useNav from './useNav';
import { generatePath } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
/**
 * 공지사항 네비게이션 핸들러 훅
 * 공지사항과 관련된 부분에서 사용할 수 있도록 핸들러를 따로 모아뒀습니다.
 * @param festivalId - 축제 ID
 * @returns {Object}
 * - handleCreateNotice: 공지사항 작성 핸들러
 * - handleEditNotice: 공지사항 수정 핸들러
 * - handleNoticeClick: 공지사항 클릭 핸들러 (공지사항 목록 페이지로 이동하면서 해당 공지에 포커싱)
 */
export const useNoticeNavigationHandlers = (festivalId: string) => {
  const { goTo } = useNav();
  const navigate = useNavigate();

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
  const handleNoticeClick = (noticeId: number) => {
    navigate(generatePath(ROUTE_PATH.FESTIVAL_NOTICES, { festivalId }), {
      state: { focusNoticeId: noticeId },
    });
  };
  return { handleCreateNotice, handleEditNotice, handleNoticeClick };
};

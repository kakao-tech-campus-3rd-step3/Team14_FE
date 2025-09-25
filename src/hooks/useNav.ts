import { ROUTE_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

/**
 * 네비게이션 훅
 * @description 단순하게 useNavigate를 사용하여 이동하는 경우 간편하게 사용할 수 있도록 만들었습니다.
 * @returns {Object}
 * - goBack: 뒤로가기 함수
 * - goHome: 홈으로 이동 함수
 * - goMy: 마이페이지로 이동 함수
 * - goSearch: 검색 페이지로 이동 함수
 */
const useNav = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goHome = () => {
    navigate(ROUTE_PATH.HOME);
  };
  const goMy = () => {
    navigate(ROUTE_PATH.MY);
  };
  const goSearch = () => {
    navigate(ROUTE_PATH.SEARCH);
  };
  return { goBack, goHome, goMy, goSearch };
};

export default useNav;

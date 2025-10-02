import { useNavigate } from 'react-router-dom';

/**
 * 네비게이션 훅
 * @description 단순하게 useNavigate를 사용하여 이동하는 경우 간편하게 사용할 수 있도록 만들었습니다.
 * @returns {Object}
 * - goBack: 뒤로가기 함수
 * - goTo(path: string): 지정된 경로로 이동하는 함수
 */
const useNav = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  return { goBack, goTo };
};

export default useNav;

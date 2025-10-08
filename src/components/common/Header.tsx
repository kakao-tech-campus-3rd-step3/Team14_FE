import Button from '@/components/common/Button';
import Home from '@/components/icon/HomeIcon';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import Profile from '@/components/icon/ProfileIcon';
import Logo from '../icon/LogoIcon';
import useNav from '@/hooks/useNav';
import { ROUTE_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import Settings from '@/components/icon/SettingIcon';

interface HeaderProps {
  variant?: 'logo' | 'page' | 'all' | 'mypage';
  title?: string;
}

/**
 * 상단 헤더 컴포넌트
 * @param variant - 헤더 변형 타입 (기본값: 'logo')
 *   - logo: 로고와 앱 이름을 표시하는 메인 헤더
 *   - page: 뒤로가기 버튼과 페이지 제목을 표시하는 서브 헤더
 *   - all: 뒤로가기, 제목, 홈/프로필 버튼을 모두 표시
 *   - mypage: 뒤로가기, 제목, 설정 버튼을 표시
 * @param title - 페이지 제목 (variant가 'page' 또는 'all'일 때 사용)
 */
const Header = ({ variant = 'logo', title = '' }: HeaderProps) => {
  const containerClasses =
    'w-full mx-auto flex flex-col items-center fixed top-0 left-0 z-999 bg-gray-100';
  const baseClasses =
    'w-full max-w-[480px] h-12 border-b border-gray-300 flex items-center bg-white';

  const { goBack } = useNav();
  const navigate = useNavigate();
  if (variant === 'logo') {
    return (
      <div className={containerClasses}>
        <div className={`${baseClasses} gap-2`}>
          <Logo className="size-10" />
          <h1 className="text-xl font-bold">FestaPick</h1>
        </div>
      </div>
    );
  }
  if (variant === 'mypage') {
    return (
      <div className={containerClasses}>
        <div className={`${baseClasses} justify-between`}>
          <div className="flex-1 flex justify-start">
            <Button variant="icon" onClick={goBack}>
              <LeftArrow className="size-6" />
            </Button>
          </div>
          <div className="flex-2 flex justify-center">
            <h1 className="text-md font-bold text-center">{'마이페이지'}</h1>
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant="icon"
              className="h-6 w-6 !p-0 rounded-lg flex items-center justify-center mr-5"
              onClick={() => navigate(ROUTE_PATH.SETTINGS)} 
            >
              <Settings className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={containerClasses}>
      <div className={`${baseClasses} justify-between`}>
        <div className="flex-1 flex justify-start">
          <Button variant="icon" onClick={goBack}>
            <LeftArrow className="size-6" />
          </Button>
        </div>
        <div className="flex-2 flex justify-center">
          <h1 className="text-md font-bold text-center">{title}</h1>
        </div>
        <div className="flex-1 flex justify-end">
          {variant === 'all' ? (
            <div className="flex-1 flex justify-end items-center ">
              <Button
                variant="icon"
                className="h-6 w-6 !p-0 rounded-lg flex items-center justify-center"
                onClick={() => navigate(ROUTE_PATH.HOME)}
              >
                <Home className="size-6" />
              </Button>

              <Button
                variant="icon"
                className="h-6 w-6 !p-0 rounded-lg flex items-center justify-center mr-5"
                onClick={() => navigate(ROUTE_PATH.MY)}
              >
                <Profile className="size-6" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;

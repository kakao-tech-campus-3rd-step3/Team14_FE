import Button from '@/components/common/Button';
import Home from '@/components/icon/HomeIcon';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import Profile from '@/components/icon/ProfileIcon';
import Logo from '../icon/LogoIcon';

interface HeaderProps {
  variant?: 'logo' | 'page' | 'all';
  title?: string;
}

/**
 * 상단 헤더 컴포넌트
 * @param variant - 헤더 변형 타입 (기본값: 'logo')
 *   - logo: 로고와 앱 이름을 표시하는 메인 헤더
 *   - page: 뒤로가기 버튼과 페이지 제목을 표시하는 서브 헤더
 *   - all: 뒤로가기, 제목, 홈/프로필 버튼을 모두 표시
 * @param title - 페이지 제목 (variant가 'page' 또는 'all'일 때 사용)
 */
const Header = ({ variant = 'logo', title = '' }: HeaderProps) => {
  const containerClasses =
    'w-full mx-auto flex flex-col items-center fixed top-0 left-0 z-999 bg-gray-100';
  const baseClasses =
    'w-full max-w-[480px] h-12 border-b border-gray-300 flex items-center bg-white';

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

  return (
    <div className={containerClasses}>
      <div className={`${baseClasses} justify-between`}>
        <div className="flex-1 flex justify-start">
          <Button variant="icon">
            <LeftArrow className="size-8" />
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex-1 flex justify-end">
          {variant === 'all' ? (
            <Button variant="icon">
              <Home className="size-8" />
              <Profile className="size-8" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;

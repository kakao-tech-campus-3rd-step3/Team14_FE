import Button from '@/components/common/Button';
import Home from '@/components/icon/HomeIcon';
import LeftArrow from '@/components/icon/LeftArrowIcon';
import Profile from '@/components/icon/ProfileIcon';
import Logo from '../icon/LogoIcon';

interface HeaderProps {
  variant?: 'logo' | 'page' | 'all';
  title?: string;
}

const Header = ({ variant = 'logo', title = '' }: HeaderProps) => {
  const containerClasses =
    'w-full mx-auto flex flex-col items-center fixed top-0 left-0 z-999 bg-gray-100';
  const baseClasses =
    'w-full max-w-[720px] h-12 border-b border-gray-300 flex items-center bg-white';

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

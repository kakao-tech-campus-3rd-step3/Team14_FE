import Home from '@/components/icon/Home';
import Profile from '@/components/icon/Profile';
import Button from '@/components/common/Button';
import Search from '@/components/icon/Search';
import Pick from '@/components/icon/Pick';

const Footer = () => {
  const containerClasses = 'w-full mx-auto flex flex-col items-center fixed bottom-0 left-0 z-999';
  const baseClasses =
    'w-full max-w-[720px] h-15 border-t border-gray-300 flex items-center bg-white';
  const buttonClasses = 'flex items-center justify-center flex-1 flex-col text-xs pt-2 pb-3 px-3';
  const iconClasses = 'size-6';

  return (
    <div className={containerClasses}>
      <div className={baseClasses}>
        <Button className={buttonClasses} variant="icon">
          <Home className={iconClasses} />
          <p>홈</p>
        </Button>
        <Button className={buttonClasses} variant="icon">
          <Search className={iconClasses} />
          <p>검색</p>
        </Button>
        <Button className={buttonClasses} variant="icon">
          <Pick className={iconClasses} />
          <p>AI 추천</p>
        </Button>
        <Button className={buttonClasses} variant="icon">
          <Profile className={iconClasses} />
          <p>My</p>
        </Button>
      </div>
    </div>
  );
};

export default Footer;

import { useState } from 'react';
import Home from '@/components/icon/HomeIcon';
import Profile from '@/components/icon/ProfileIcon';
import Button from '@/components/common/Button';
import Search from '@/components/icon/SearchIcon';
import Pick from '@/components/icon/PickIcon';

type FooterSelected = 'home' | 'search' | 'pick' | 'my' | 'none';

const Footer = ({ initialSelected = 'none' }: { initialSelected?: FooterSelected }) => {
  const [selected, setSelected] = useState<FooterSelected>(initialSelected);

  const containerClasses = 'w-full mx-auto flex flex-col items-center fixed bottom-0 left-0 z-999';
  const baseClasses =
    'w-full max-w-[720px] h-15 border-t border-gray-300 flex items-center bg-white';
  const buttonClasses = 'flex items-center justify-center flex-1 flex-col text-xs pt-2 pb-3 px-3';
  const iconClasses = 'size-6';

  return (
    <div className={containerClasses}>
      <div className={baseClasses}>
        <Button className={buttonClasses} variant="icon" onClick={() => setSelected('home')}>
          <Home className={iconClasses} variant={selected === 'home' ? 'solid' : 'outline'} />
          <p>홈</p>
        </Button>
        <Button className={buttonClasses} variant="icon" onClick={() => setSelected('search')}>
          <Search className={iconClasses} variant={selected === 'search' ? 'solid' : 'outline'} />
          <p>검색</p>
        </Button>
        <Button className={buttonClasses} variant="icon" onClick={() => setSelected('pick')}>
          <Pick className={iconClasses} variant={selected === 'pick' ? 'solid' : 'outline'} />
          <p>AI 추천</p>
        </Button>
        <Button className={buttonClasses} variant="icon" onClick={() => setSelected('my')}>
          <Profile className={iconClasses} variant={selected === 'my' ? 'solid' : 'outline'} />
          <p>My</p>
        </Button>
      </div>
    </div>
  );
};

export default Footer;

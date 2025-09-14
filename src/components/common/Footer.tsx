import { useState } from 'react';
import Home from '@/components/icon/HomeIcon';
import Profile from '@/components/icon/ProfileIcon';
import Button from '@/components/common/Button';
import Search from '@/components/icon/SearchIcon';
import Pick from '@/components/icon/PickIcon';

type FooterSelected = 'home' | 'search' | 'pick' | 'my' | 'none';

const navigationItems = [
  { id: 'home', icon: Home, label: '홈' },
  { id: 'search', icon: Search, label: '검색' },
  { id: 'pick', icon: Pick, label: 'AI 추천' },
  { id: 'my', icon: Profile, label: 'My' },
] as const;

const Footer = ({ initialSelected = 'none' }: { initialSelected?: FooterSelected }) => {
  const [selected, setSelected] = useState<FooterSelected>(initialSelected);

  const containerClasses = 'w-full mx-auto flex flex-col items-center fixed bottom-0 left-0 z-999';
  const baseClasses =
    'w-full max-w-[480px] h-15 border-t border-gray-300 flex items-center bg-white';
  const buttonClasses = 'flex items-center justify-center flex-1 flex-col text-xs pt-2 pb-3 px-3';
  const iconClasses = 'size-6';

  return (
    <div className={containerClasses}>
      <div className={baseClasses}>
        {navigationItems.map(({ id, icon: IconComponent, label }) => (
          <Button key={id} className={buttonClasses} variant="icon" onClick={() => setSelected(id)}>
            <IconComponent
              className={iconClasses}
              variant={selected === id ? 'solid' : 'outline'}
            />
            <p className={selected === id ? 'font-bold' : 'font-normal'}>{label}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Footer;

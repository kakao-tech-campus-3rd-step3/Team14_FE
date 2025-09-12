import { useState } from 'react';
import Modal from '@/pages/Home/components/Modal';
import type { Region } from '@/types/Region';

type Pin = Region & { top: number; left: number; icon: string };

const STAGE_W = 720;
const STAGE_H = 700;

const MAP_PINS: Pin[] = [
  { id: 'seoul', name: '서울', top: 20, left: 38, icon: '/area/seoul.svg', areaId: '1' },
  { id: 'incheon', name: '인천', top: 24, left: 30, icon: '/area/incheon.svg', areaId: '2' },
  { id: 'kyungki', name: '경기', top: 26, left: 45, icon: '/area/gyeonggi.svg', areaId: '31' },
  { id: 'kangwon', name: '강원', top: 18, left: 58, icon: '/area/gangwon.svg', areaId: '32' },
  { id: 'daejeon', name: '대전', top: 44, left: 44, icon: '/area/daejeon.svg', areaId: '3' },
  { id: 'chungbuk', name: '충북', top: 35, left: 48, icon: '/area/chungbuk.svg', areaId: '33' },
  { id: 'chungnam', name: '충남', top: 45, left: 32, icon: '/area/chungnam.svg', areaId: '34' },
  { id: 'gwanju', name: '광주', top: 68, left: 34, icon: '/area/gwanju.svg', areaId: '5' },
  { id: 'jeonbuk', name: '전북', top: 63, left: 43, icon: '/area/jeonbuk.svg', areaId: '35' },
  { id: 'jyunnam', name: '전남', top: 78, left: 37, icon: '/area/jeonnam.svg', areaId: '36' },
  { id: 'kyungbuk', name: '경북', top: 42, left: 65, icon: '/area/gyeongbuk.svg', areaId: '37' },
  { id: 'daegue', name: '대구', top: 54, left: 62, icon: '/area/daegue.svg', areaId: '4' },
  { id: 'kyungnam', name: '경남', top: 62, left: 58, icon: '/area/gyeongnam.svg', areaId: '38' },
  { id: 'ulsan', name: '울산', top: 58, left: 72, icon: '/area/ulsan.svg', areaId: '7' },
  { id: 'buan', name: '부산', top: 70, left: 70, icon: '/area/buan.svg', areaId: '6' },
  { id: 'jeju', name: '제주', top: 90, left: 35, icon: '/area/jeju.svg', areaId: '39' },
];

const OCEAN_PINS: Pin[] = [
  { id: 'shipment', name: '어선', top: 90, left: 80, icon: '/ocean/shipment.svg', areaId: '' },
  { id: 'fish01', name: '물고기', top: 95, left: 70, icon: '/ocean/fish.svg', areaId: '' },
  { id: 'fish02', name: '물고기', top: 98, left: 60, icon: '/ocean/fish.svg', areaId: '' },
  { id: 'fish03', name: '물고기', top: 100, left: 66, icon: '/ocean/fish.svg', areaId: '' },
  { id: 'ferry', name: '페리선', top: 80, left: 15, icon: '/ocean/ferry.svg', areaId: '' },
  { id: 'dokdo', name: '독도', top: 30, left: 84, icon: '/ocean/dokdo.svg', areaId: '' },
  { id: 'airplane', name: '비행기', top: 30, left: 14, icon: '/ocean/airplane.svg', areaId: '' },
];

const HomeContent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const openFor = (pin: Pin) => {
    setSelectedPin(pin);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setSelectedPin(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-3.7rem)] bg-gradient-to-br from-[var(--color-secondary-300)] via-[var(--color-secondary-400)] to-[var(--color-secondary-300)] flex items-center justify-center">
      <div className="relative w-full h-full max-w-[720px] max-h-[700px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative w-full h-full max-w-full max-h-full"
            style={{ aspectRatio: `${STAGE_W}/${STAGE_H}` }}
          >
            <img
              src="/koreamap.svg"
              width={STAGE_W}
              height={STAGE_H}
              className="absolute inset-0 w-full h-full object-contain select-none"
              alt="koreamap"
            />
            <div className="absolute inset-0">
              {MAP_PINS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={{ top: `${p.top}%`, left: `${p.left}%` }}
                  onClick={() => openFor(p)}
                  aria-label={p.name}
                >
                  <span className="absolute -inset-3" />
                  <img
                    src={p.icon}
                    alt={p.name}
                    className="w-10 sm:w-12 md:w-14 transition-transform group-hover:scale-110 active:scale-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full max-w-[720px] max-h-[700px] mx-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="relative w-full h-full"
              style={{ aspectRatio: `${STAGE_W}/${STAGE_H}` }}
            >
              {OCEAN_PINS.map((p) => (
                <div
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group pointer-events-none"
                  style={{ top: `${p.top}%`, left: `${p.left}%` }}
                >
                  <img
                    src={p.icon}
                    alt={p.name}
                    className="w-12 sm:w-14 md:w-16 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openModal && <Modal isOpen={openModal} close={closeModal} pin={selectedPin} />}
    </div>
  );
};

export default HomeContent;

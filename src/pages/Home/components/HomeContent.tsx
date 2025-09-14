import { useState } from 'react';
import Modal from '@/pages/Home/components/Modal';
import type { Pin } from '@/types/Pin';
import MAP_PINS from '@/constants/mapPins';
import OCEAN_PINS from '@/constants/oceanPins';

const STAGE_W = 480;
const STAGE_H = 467;

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
    <div className="absolute w-full h-[calc(100vh-6.75rem)] bg-gradient-to-br from-[var(--color-secondary-300)] via-[var(--color-secondary-400)] to-[var(--color-secondary-300)] flex items-center justify-center">
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
                  className="w-10 sm:w-10 md:w-12 transition-transform group-hover:scale-110 active:scale-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                  draggable={false}
                />
              </button>
            ))}
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

      {openModal && <Modal isOpen={openModal} close={closeModal} pin={selectedPin} />}
    </div>
  );
};

export default HomeContent;

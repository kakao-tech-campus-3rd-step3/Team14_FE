import ModalLogo from '@/components/icon/ModalLogo';
import { useEffect } from 'react';
import Button from '@/components/common/Button';
import type { Region } from '@/types/Region';

type Pin = Region & { top: number; left: number; icon: string };

interface Props {
  close: () => void;
  isOpen: boolean;
  pin: Pin | null;
}

const Modal = ({ close, isOpen, pin }: Props) => {
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center  bg-black/40">
      <div className="max-w-[720px] px-[7px] py-[10px] gap-[9px] bg-white  shadow-lg max-w-md w-full mx-4 justify-center flex flex-col items-center justify-center h-auto">
        <p className="text-3xl">AI Pick Festival</p>
        <p className="text-3xl text-primary-400">{pin?.name}</p>
        <p className="text-sm">취향에 딱 맞게 찾아드립니다! <br />
       나만을 위한 지역 축제 추천</p>
        {pin?.icon ? (
          <img
            src={pin.icon}
            alt={pin.name}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <ModalLogo className="size-50" />
        )}
        <Button
          className="flex items-center justify-center px-5 py-3 gap-2.5 w-[180px]"
          onClick={close}
        >
          나만의 지역 축제 찾기
        </Button>
        <Button variant="link" onClick={close}>
          건너뛰기
        </Button>
      </div>
    </div>
  );
};

export default Modal;

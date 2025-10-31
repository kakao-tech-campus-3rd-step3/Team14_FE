import ModalLogo from '@/components/icon/ModalLogo';
import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import type { Pin } from '@/types/Pin';
import { ROUTE_PATH } from '@/constants/routes';
import DIALECT_MESSAGES from '@/constants/dialectMessages';
import Map from '@/components/icon/MapIcon';
import Close from '@/components/icon/CloseIcon';

interface Props {
  close: () => void;
  isOpen: boolean;
  pin: Pin | null;
}

const Modal = ({ close, isOpen, pin }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const message =
    (pin?.id && DIALECT_MESSAGES[pin.id]) ||
    '취향에 딱 맞게 찾아드립니다!\n나만을 위한 지역 축제 추천';

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/40"
      role="button"
      aria-label="모달 닫기"
      tabIndex={0}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          close();
        }
      }}
    >
      <div className="relative max-w-[720px] gap-2 bg-white shadow-lg m-3 max-w-md w-full flex flex-col items-center justify-center rounded-2xl">
        <Button variant="icon" className="absolute top-2 right-2" onClick={close}>
          <Close className="size-6" strokeWidth={3} />
        </Button>

        <div className="flex items-center justify-center gap-2 text-5xl font-bold text-primary-400 pt-12">
          <Map className="size-12" />
          <p>{pin?.name}</p>
        </div>
        <p className="mt-2 text-sm text-center whitespace-pre-line">{message}</p>

        {pin?.icon ? (
          <img src={pin.icon} alt={pin.name} className="w-50 h-50 object-contain mt-3" />
        ) : (
          <div className="mt-3">
            <ModalLogo className="size-12" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-3 w-full px-15 pt-2 pb-10">
          <Button
            className="flex-1"
            fullWidth
            onClick={() => {
              if (pin?.areaId) {
                navigate(generatePath(ROUTE_PATH.PICK, { areaId: pin.areaId }));
              }
              close();
            }}
          >
            나만의 지역 축제 찾기
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            fullWidth
            onClick={() => {
              if (pin?.areaId) {
                navigate(generatePath(ROUTE_PATH.FESTIVALS, { areaId: pin.areaId }));
              }
              close();
            }}
          >
            지역 축제 둘러보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

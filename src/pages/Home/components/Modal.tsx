import ModalLogo from '@/components/icon/ModalLogo';
import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import type { Pin } from '@/types/Pin';
import { ROUTE_PATH } from '@/constants/routes';
import DIALECT_MESSAGES from '@/constants/dialectMessages';

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
      <div className="max-w-[720px] px-[7px] py-[10px] gap-[9px] bg-white shadow-lg max-w-md w-full mx-4 justify-center flex flex-col items-center justify-center h-auto">
        <p className="text-xl font-semibold">AI Pick Festival</p>
        <p className="text-6xl font-bold text-primary-400 mt-1">{pin?.name}</p>
        <p className="mt-2 text-sm text-center whitespace-pre-line">{message}</p>

        {pin?.icon ? (
          <img src={pin.icon} alt={pin.name} className="w-50 h-50 object-contain mt-3" />
        ) : (
          <div className="mt-3">
            <ModalLogo className="size-12" />
          </div>
        )}

        <Button
          className="mt-4 px-5 py-3 w-[180px]"
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
          variant="link"
          className="mt-1"
          onClick={() => {
            if (pin?.areaId) {
              navigate(generatePath(ROUTE_PATH.FESTIVALS, { areaId: pin.areaId }));
            }
            close();
          }}
        >
          건너뛰기
        </Button>
      </div>
    </div>
  );
};

export default Modal;

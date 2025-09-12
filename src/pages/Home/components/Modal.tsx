import ModalLogo from '@/components/icon/ModalLogo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import type { Region } from '@/types/Region';

type Pin = Region & { top: number; left: number; icon: string };

interface Props {
  close: () => void;
  isOpen: boolean;
  pin: Pin | null;
}

const DIALECT_MESSAGES: Record<string, string> = {
  seoul: '취향에 딱 맞게 찾아드릴게요!\n나만을 위한 서울 축제 추천',
  incheon: '인천 오셨네요, 믿고 맡겨요~\n나만을 위한 인천 축제 추천',
  kyungki: '경기도 구석구석 골라드릴게요!\n나만을 위한 경기 축제 추천',

  kangwon: '시원한 강원 바람처럼 딱 골라드릴게요!\n나만을 위한 강원 축제 추천',

  daejeon: '그려유, 취향 맞춰드릴게유~\n나만을 위한 대전 축제 추천',
  chungbuk: '취향 맞춰드릴게유~\n나만을 위한 충북 축제 추천',
  chungnam: '느긋하게 골라드릴게유~\n나만을 위한 충남 축제 추천',

  gwanju: '거시기 취향 딱 맞춰주겠당께!\n나만을 위한 광주 축제 추천',
  jeonbuk: '거시기~ 니 취향 맞춰줄라잉?\n나만을 위한 전북 축제 추천',
  jyunnam: '거 그라제잉, 딱 맞춰주제잉!\n나만을 위한 전남 축제 추천',

  kyungbuk: '와! 취향 딱 맞춰줄게카이!\n나만을 위한 경북 축제 추천',
  daegue: '마, 취향 딱 맞춰줄게!\n나만을 위한 대구 축제 추천',
  kyungnam: '아이라~ 취향대로 골라줄게예!\n나만을 위한 경남 축제 추천',
  ulsan: '마, 울산은 내가 챙길게! 딱 맞춰준다!\n나만을 위한 울산 축제 추천',
  buan: '마! 취향에 딱 맞게 찾아줄게!\n나만을 위한 부산 축제 추천',

  jeju: '혼저옵서예, 취향 싹 맞춰드릴게!\n나만을 위한 제주 축제 추천',
  shipment: '바다에서도 취향 맞춰드릴게요!\n나만을 위한 해상 축제 추천',
};

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
              navigate(`/pick?areaId=${pin.areaId}`);
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
              navigate(`/pick?areaId=${pin.areaId}`);
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

import { useState } from "react";
import Modal from "@/pages/Home/components/Modal";
import type { Region } from "@/types/Region";

type Pin = Region & { top: number; left: number; icon: string };

const STAGE_W = 720;
const STAGE_H = 700;

const PINS: Pin[] = [
  { id: "seoul",    name: "서울",   top: 20, left: 38, icon: "/seoul.svg" },
  { id: "incheon",  name: "인천",   top: 24, left: 30, icon: "/incheon.svg" },
  { id: "kyungki",  name: "경기",   top: 26, left: 45, icon: "/kyungki.svg" },
  { id: "kangwon",  name: "강원",   top: 18, left: 58, icon: "/kangwon.svg" },
  { id: "daejeon",  name: "대전",   top: 44, left: 44, icon: "/daejeon.svg" },
  { id: "chungbuk", name: "충북",   top: 35, left: 48, icon: "/chungbuk.svg" },
  { id: "chungnam", name: "충남",   top: 45, left: 32, icon: "/chungnam.svg" },
  { id: "gwanju",   name: "광주",   top: 68, left: 34, icon: "/gwanju.svg" },
  { id: "jeonbuk",  name: "전북",   top: 63, left: 43, icon: "/jeonbuk.svg" },
  { id: "jyunnam",  name: "전남",   top: 78, left: 37, icon: "/jyunnam.svg" },
  { id: "kyungbuk", name: "경북",   top: 42, left: 65, icon: "/kyungbuk.svg" },
  { id: "daegue",   name: "대구",   top: 54, left: 62, icon: "/daegue.svg" },
  { id: "kyungnam", name: "경남",   top: 62, left: 58, icon: "/kyungnam.svg" },
  { id: "ulsan",    name: "울산",   top: 58, left: 72, icon: "/ulsan.svg" },
  { id: "buan",     name: "부산",   top: 70, left: 70, icon: "/buan.svg" },
  { id: "jeju",     name: "제주",   top: 90, left: 35, icon: "/jeju.svg" },
];

export default function HomeContent() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const openFor = (r: Region) => { setSelectedRegion(r); setOpenModal(true); };
  const closeModal = () => { setOpenModal(false); setSelectedRegion(null); };

  return (
    <div className="relative w-full h-[calc(100vh-3.7rem)] bg-[#42B5D9] flex items-center justify-center">
      <div className="relative w-full h-full max-w-[720px] max-h-[700px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full max-w-full max-h-full" style={{ aspectRatio: `${STAGE_W}/${STAGE_H}` }}>
            <img
              src="/koreamap.svg"
              width={STAGE_W}
              height={STAGE_H}
              className="absolute inset-0 w-full h-full object-contain select-none"
            />
            <div className="absolute inset-0">
              {PINS.map((p) => (
                <button
                  key={p.id}
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

      {openModal && <Modal isOpen={openModal} close={closeModal} region={selectedRegion} />}
    </div>
  );
}


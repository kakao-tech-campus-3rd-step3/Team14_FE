import { useState } from 'react';
import Modal from '@/pages/Home/components/Modal';
import Button from '@/components/common/Button';
import type { Region } from '@/types/Region';

//api 구현 후 삭제 예정입니다.
const regions: Region[] = [
  { id: '1', name: '부산' },
  { id: '2', name: '서울' },
  { id: '3', name: '대구' },
  { id: '4', name: '광주' },
  { id: '5', name: '대전' },
  { id: '6', name: '울산' },
  { id: '7', name: '인천' },
];

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const openFor = (region: Region) => {
    setSelectedRegion(region);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedRegion(null);
  };

  return (
    <div>
      {regions.map((r) => (
        <Button key={r.id} onClick={() => openFor(r)} className="">
          {r.name}
        </Button>
      ))}
      {openModal && <Modal isOpen={openModal} close={closeModal} region={selectedRegion} />}
    </div>
  );
};
export default Home;

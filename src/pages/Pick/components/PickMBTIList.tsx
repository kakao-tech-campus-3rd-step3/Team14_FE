import PickMBTICard from '@/pages/Pick/components/PickMBTICard';
import PICK_MBTI from '@/constants/pickMBTI';

const PickMBTIList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {PICK_MBTI.map((mbti) => (
        <PickMBTICard
          key={mbti.id}
          title={mbti.title}
          option1={mbti.option1}
          option2={mbti.option2}
        />
      ))}
    </div>
  );
};

export default PickMBTIList;

import PickMBTICard from '@/pages/Pick/components/PickMBTICard';

const PickMBTIList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <PickMBTICard title="이번에 나는" option1="새로운 곳" option2="익숙한 곳" />
      <PickMBTICard title="여행갈 때" option1="혼자" option2="함께" />
      <PickMBTICard title="여행에서" option1="즐거움을" option2="유익함을" />
      <PickMBTICard title="여행을" option1="즉흥적으로" option2="계획적으로" />
    </div>
  );
};

export default PickMBTIList;

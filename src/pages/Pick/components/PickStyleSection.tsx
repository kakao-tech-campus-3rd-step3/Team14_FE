import PickSubTitle from '@/pages/Pick/components/PickSubTitle';
import PickStyleList from '@/pages/Pick/components/PickStyleList';
import Button from '@/components/common/Button';
import { usePick } from '@/contexts/PickContext';

const PickStyleSection = () => {
  const { goToNextStep, canProceedToMbti } = usePick();

  return (
    <section className="flex flex-col h-full px-8 py-4 gap-8">
      <div className="flex flex-col items-center gap-1">
        <PickSubTitle />
        <h1 className="w-full text-left text-2xl">
          즐기고 싶은 <span className="font-bold">축제의 스타일</span>을<br />
          선택해 주세요. <span className="text-gray-500 text-sm">(최대 3개)</span>
        </h1>
      </div>
      <PickStyleList />
      <Button
        className="text-lg"
        fullWidth
        onClick={() => goToNextStep()}
        disabled={!canProceedToMbti}
      >
        다음
      </Button>
    </section>
  );
};

export default PickStyleSection;

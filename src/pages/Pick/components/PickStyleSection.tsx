import PickSubTitle from '@/pages/Pick/components/PickSubTitle';
import PickStyleList from '@/pages/Pick/components/PickStyleList';

const PickStyleSection = () => {
  return (
    <section className="flex flex-col h-full px-8 py-4">
      <div className="flex flex-col items-center gap-1 mb-8">
        <PickSubTitle />
        <h1 className="w-full text-left text-2xl">
          즐기고 싶은 <span className="font-bold">축제의 스타일</span>을<br />
          선택해 주세요.
        </h1>
      </div>
      <PickStyleList />
    </section>
  );
};

export default PickStyleSection;

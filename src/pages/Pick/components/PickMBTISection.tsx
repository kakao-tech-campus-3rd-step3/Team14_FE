import PickSubTitle from '@/pages/Pick/components/PickSubTitle';
import PickMBTIList from '@/pages/Pick/components/PickMBTIList';
import OutlineInputField from '@/components/form/OutlineInputField';
import Button from '@/components/common/Button';
import { generatePath, Link, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';

const PickMBTISection = () => {
  const { areaId } = useParams();
  return (
    <section className="flex flex-col h-full px-8 py-4 gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <PickSubTitle />
          <h1 className="w-full text-left text-2xl">
            당신의 <span className="font-bold">여행 MBTI</span>를<br />
            선택해 주세요.
          </h1>
        </div>
        <PickMBTIList />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="w-full text-left text-2xl">
          나를 <span className="font-bold">더</span> 알려주고 싶어요.
        </h1>
        <OutlineInputField placeholder="캠핑, 불멍, 서핑" rounded="xl" />
        <Link to={generatePath(ROUTE_PATH.FESTIVALS, { areaId: areaId || '' })}>
          <Button className="text-lg" fullWidth>
            추천 받기
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PickMBTISection;

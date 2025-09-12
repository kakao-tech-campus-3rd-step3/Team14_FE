import getFestivals from '@/apis/festivals/getFestivals';
import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';
import { useSuspenseQuery } from '@tanstack/react-query';

const FestivalsAISection = () => {
  // AI 관련 api가 없어 임시로 연결
  const areaId = '2';
  const { data } = useSuspenseQuery({
    queryKey: ['AIPick', areaId],
    queryFn: () => getFestivals({ areaId: areaId }),
  });

  return <FestivalsSection title="AI pick" data={data.data.content} />;
};

export default FestivalsAISection;

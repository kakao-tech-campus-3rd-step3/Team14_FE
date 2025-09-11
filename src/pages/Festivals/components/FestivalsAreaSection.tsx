import { useSuspenseQuery } from '@tanstack/react-query';
import getFestivals from '@/apis/festivals/getFestivals';
import FestivalsSection from './FestivalsSection';

const FestivalsAreaSection = () => {
  const areaId = '2';
  const { data } = useSuspenseQuery({
    queryKey: ['festivals', areaId],
    queryFn: () => getFestivals({ areaId: areaId }),
  });

  return <FestivalsSection title="Festivals" data={data.data.content} />;
};

export default FestivalsAreaSection;

import { useSuspenseQuery } from '@tanstack/react-query';
import getFestivals from '@/apis/festivals/getFestivals';
import FestivalsSection from './FestivalsSection';
import { useParams } from 'react-router-dom';

const FestivalsAreaSection = () => {
  const { areaId } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: ['festivals', areaId],
    queryFn: () => getFestivals({ areaId: areaId || '' }),
  });

  return <FestivalsSection title="Festivals" data={data.data.content} />;
};

export default FestivalsAreaSection;

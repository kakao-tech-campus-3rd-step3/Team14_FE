import { useQuery } from '@tanstack/react-query';
import getFestivals from '@/apis/festivals/getFestivals';
import FestivalsSection from './FestivalsSection';

const FestivalsAreaSection = () => {
  const areaId = '2';
  const { data, isPending, isError } = useQuery({
    queryKey: ['festivals', areaId],
    queryFn: () => getFestivals({ areaId: areaId }),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <FestivalsSection title="Festivals" data={data?.data.content} />;
};

export default FestivalsAreaSection;

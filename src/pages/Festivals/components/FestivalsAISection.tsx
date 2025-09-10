import { festivalsMockData } from '@/mocks/festivals.mock';
import FestivalsSection from '@/pages/Festivals/components/FestivalsSection';

const FestivalsAISection = () => {
  const data = festivalsMockData;
  return <FestivalsSection title="AI pick" data={data} />;
};

export default FestivalsAISection;

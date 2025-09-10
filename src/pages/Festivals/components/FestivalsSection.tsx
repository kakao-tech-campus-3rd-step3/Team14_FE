import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';

interface FestivalsSectionProps {
  title: string;
  data: Festival[];
}

const FestivalsSection = ({ title, data }: FestivalsSectionProps) => {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-left text-2xl font-bold">{title}</h2>
      <div className="w-full flex flex-col items-center py-4 gap-6">
        {data.map((festival) => (
          <FestivalCard key={festival.id} data={festival} />
        ))}
      </div>
    </section>
  );
};

export default FestivalsSection;

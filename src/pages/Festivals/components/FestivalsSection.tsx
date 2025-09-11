import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';

interface FestivalsSectionProps {
  title: string;
  data: Festival[];
}

const FestivalsSection = ({ title, data }: FestivalsSectionProps) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-left">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((festival) => (
          <FestivalCard key={festival.id} data={festival} />
        ))}
      </div>
    </section>
  );
};

export default FestivalsSection;

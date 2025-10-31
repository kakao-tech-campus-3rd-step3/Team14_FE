import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';

interface FestivalsSectionProps {
  title: string;
  data: Festival[];
  highlight?: boolean;
}

const FestivalsSection = ({ title, data, highlight = false }: FestivalsSectionProps) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data?.map((festival) => (
          <FestivalCard key={festival.id} data={festival} highlight={highlight} />
        ))}
      </div>
    </section>
  );
};

export default FestivalsSection;
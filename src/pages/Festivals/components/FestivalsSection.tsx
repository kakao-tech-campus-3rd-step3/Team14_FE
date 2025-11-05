import EmptyComponent from '@/components/common/EmptyComponent';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';
import type { Festival } from '@/types/FestivalType';
import type { ReactNode } from 'react';

interface FestivalsSectionProps {
  title: string;
  data: Festival[];
  highlight?: boolean;
  rightAction?: ReactNode;
}

const FestivalsSection = ({
  title,
  data,
  highlight = false,
  rightAction,
}: FestivalsSectionProps) => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-left text-gray-900">{title}</h2>
        {rightAction}
      </div>
      {data.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src="/lost404.svg" alt="no festivals" className="w-64 h-64 mt-12 drop-shadow-lg" />
          <EmptyComponent
            title="진행 중인 축제가 없습니다."
            description="진행 중 체크를 해제하거나 다른 지역의 축제를 찾아보세요!"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {data.map((festival) => (
            <FestivalCard key={festival.id} data={festival} highlight={highlight} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FestivalsSection;

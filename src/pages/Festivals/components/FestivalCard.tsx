import { ROUTE_PATH } from '@/constants/routes';
import type { Festival } from '@/types/FestivalType';
import { generatePath, Link } from 'react-router-dom';

interface FestivalCardProps {
  data: Festival;
}

const FestivalCard = ({ data }: FestivalCardProps) => {
  return (
    <Link
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-[1.02] cursor-pointer"
      to={generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: data.id.toString() })}
    >
      {/* 이미지 섹션 */}
      <div className="aspect-[3/2] w-full">
        <img
          src={data.posterInfo}
          alt={`${data.title} 축제 이미지`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {data.title}
        </h3>

        <div className="space-y-1">
          <p className="text-sm sm:text-xs text-gray-600 font-medium whitespace-nowrap overflow-hidden">
            {data.startDate} ~ {data.endDate}
          </p>
          <p className="text-sm sm:text-xs text-gray-500" title={data.addr1}>
            {data.addr1.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FestivalCard;

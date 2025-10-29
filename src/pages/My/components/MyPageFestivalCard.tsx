import { ROUTE_PATH } from '@/constants/routes';
import type { Festival } from '@/types/FestivalType';
import { generatePath, Link } from 'react-router-dom';

interface MyPageFestivalCardProps {
  data: Festival;
}

const MyPageFestivalCard = ({ data }: MyPageFestivalCardProps) => {
  return (
    <Link
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-150 cursor-pointer flex items-center h-35"
      to={generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: data.id.toString() })}
    >
      {/* 이미지 섹션 */}
      <div className="relative h-full overflow-hidden flex-shrink-0 rounded-l-xl">
        <img
          src={data.posterInfo}
          alt={`${data.title} 축제 이미지`}
          className="h-full object-cover"
        />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="h-full flex-1 min-w-0 py-5 px-4 flex flex-col justify-between">
        <h3 className="text-base font-semibold text-gray-900 truncate">{data.title}</h3>

        <div className="space-y-1">
          <p className="text-sm text-gray-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {data.startDate} ~ {data.endDate}
          </p>
          <p className="text-sm text-gray-500 truncate" title={data.addr1}>
            {data.addr1.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MyPageFestivalCard;

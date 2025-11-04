import Heart from '@/components/icon/HeartIcon';
import StarIcon from '@/components/icon/StarIcon';
import { ROUTE_PATH } from '@/constants/routes';
import type { Festival } from '@/types/FestivalType';
import { generatePath, Link } from 'react-router-dom';

interface FestivalCardProps {
  data: Festival;
  highlight?: boolean;
}

const isInProgress = (endDateData: string): boolean => {
  const endDate = new Date(endDateData);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  return diffTime >= 0;
};

const FestivalCard = ({ data, highlight = false }: FestivalCardProps) => {
  const isInProgressFestival = isInProgress(data.endDate);
  return (
    <Link
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-100 hover:scale-[1.02] cursor-pointer ${highlight ? 'ring-3 ring-primary-300' : ''}`}
      to={generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: data.id.toString() })}
    >
      {/* 이미지 섹션 */}
      <div
        className={`aspect-[3/2] w-full relative ${!isInProgressFestival ? 'brightness-40' : ''}`}
      >
        <img
          src={data.posterInfo}
          alt={`${data.title} 축제 이미지`}
          className="w-full h-full object-cover"
        />
        {isInProgressFestival && (
          <div className="absolute top-0 right-0 p-2 bg-primary-400 rounded-bl-xl">
            <span className="text-white text-sm font-bold">진행 중</span>
          </div>
        )}
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem]">
          {data.title}
        </h3>

        <div className="space-y-1">
          <p className="text-sm sm:text-xs text-gray-600 font-medium whitespace-nowrap overflow-hidden">
            {data.startDate} ~ {data.endDate}
          </p>
          <p className="text-sm sm:text-xs text-gray-500" title={data.addr1}>
            {data.addr1.split(' ').slice(0, 2).join(' ')}
          </p>
          <div className="flex items-center gap-2 justify-end font-bold">
            <div className="flex items-center gap-1">
              <StarIcon
                filled
                className={`${data.averageScore !== null ? 'text-yellow-400' : 'text-gray-300'} size-4`}
              />
              <span className="text-sm sm:text-xs text-gray-700">
                {data.averageScore?.toFixed(1) ?? '-'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart fill className="size-3" />
              <span className="text-sm sm:text-xs text-gray-700">{data.wishCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FestivalCard;

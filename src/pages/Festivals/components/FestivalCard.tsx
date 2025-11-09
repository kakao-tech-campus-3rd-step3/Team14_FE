import Heart from '@/components/icon/HeartIcon';
import StarIcon from '@/components/icon/StarIcon';
import { ROUTE_PATH } from '@/constants/routes';
import type { Festival } from '@/types/FestivalType';
import { generatePath, Link } from 'react-router-dom';

interface FestivalCardProps {
  data: Festival;
  highlight?: boolean;
}
/* 기존에는 서버에서 내려오는 축제의 종료일과 오늘 날짜를 비교하는 로직과의 차이에서 
* 서버에서 받은 날짜 문자열("YYYY-MM-DD")은 Date 객체 생성 시 KST 09:00:00으로 해석되는데 그대로 뺄셈을 진행해서 오류가 발생했었습니다.
* 이를 해결하기 위해 종료일을 Date 객체로 생성 시 23:59:59로 초기화하여 하루 종일 "진행 중"으로 표시하도록 하였습니다.
*/
const isInProgress = (endDateData: string): boolean => {
  const [year, month, day] = endDateData.split('-').map(Number);
  const endDate = new Date(year, month - 1, day, 23, 59, 59);
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
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem] break-all">
          {data.title}
        </h3>

        <div className="space-y-1">
          <p className="text-sm sm:text-xs text-gray-600 font-medium whitespace-nowrap overflow-hidden">
            {data.startDate} ~ {data.endDate}
          </p>
          <p className="text-sm sm:text-xs text-gray-500 break-all" title={data.addr1}>
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

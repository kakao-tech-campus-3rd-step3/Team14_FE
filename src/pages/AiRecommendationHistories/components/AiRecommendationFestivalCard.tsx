import { ROUTE_PATH } from '@/constants/routes';
import type { Festival } from '@/types/FestivalType';
import { generatePath, Link } from 'react-router-dom';
import StarRating from '@/components/common/StarRating';

interface AiRecommendationFestivalCardProps {
  data: Festival;
  rank?: number; // 추천 순위
  reviewCount?: number; // 리뷰 수 (옵션)
}

/**
 * AI 추천 축제 카드
 * 추천 축제 정보를 표시합니다.
 * @param data 축제 데이터
 * @param recommendationReason 추천 이유
 * @param rank 추천 순위 (현재 api응답에는 없어서 index순으로 나열됩니다.)
 * @param reviewCount 리뷰 수
 * @returns AI 추천 축제 카드
 */
const AiRecommendationFestivalCard = ({
  data,
  rank,
  reviewCount,
}: AiRecommendationFestivalCardProps) => {
  return (
    <Link
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer border-2 border-primary-300"
      to={generatePath(ROUTE_PATH.FESTIVAL_INFO, { festivalId: data.id.toString() })}
    >
      <div className="bg-gradient-to-r from-primary-400 to-primary-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {rank && (
              <span className="bg-white text-primary-500 font-bold text-sm px-2 py-0.5 rounded">
                #{rank}
              </span>
            )}
            <span className="text-white font-bold text-xs">AI PICK</span>
          </div>
        </div>
      </div>

      <div className="aspect-[3/2] w-full relative">
        <img
          src={data.posterInfo}
          alt={`${data.title} 축제 이미지`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem]">
          {data.title}
        </h3>

        {(data.averageScore !== null || reviewCount) && (
          <div className="flex items-center gap-2 mt-2 mb-2 text-sm text-gray-700">
            {data.averageScore !== null && (
              <>
                <StarRating rating={data.averageScore} showScore size="sm" />
                {reviewCount && (
                  <>
                    <div className="w-px h-3 bg-gray-300" />
                    <p className="text-xs text-gray-600">리뷰 {reviewCount}건</p>
                  </>
                )}
              </>
            )}
            {!data.averageScore && reviewCount && (
              <p className="text-xs text-gray-600">리뷰 {reviewCount}건</p>
            )}
          </div>
        )}

        <div className="space-y-1 mt-2">
          <p className="text-sm text-gray-600 font-medium whitespace-nowrap overflow-hidden">
            {data.startDate} ~ {data.endDate}
          </p>
          <p className="text-sm text-gray-500" title={data.addr1}>
            {data.addr1.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AiRecommendationFestivalCard;

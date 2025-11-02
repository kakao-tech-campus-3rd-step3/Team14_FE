import { useQuery } from '@tanstack/react-query';
import { getRecommendationHistories } from '@/apis/ai/getRecommendationHistories';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import EmptyComponent from '@/components/common/EmptyComponent';
import { useAuth } from '@/context/AuthContext';
import type { Festival } from '@/types/FestivalType';
import AiRecommendationFestivalCard from '@/pages/AiRecommendationHistories/components/AiRecommendationFestivalCard';
import AiRecommendationSummaryCard from '@/pages/AiRecommendationHistories/components/AiRecommendationSummaryCard';
/**
 * AI 추천 내역 콘텐츠
 * 사용자가 받았던 최신 AI 추천 내역을 확인할 수 있습니다.
 * @returns AI 추천 내역 콘텐츠
 */
const AiRecommendationHistoriesContent = () => {
  const { isInitialized } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ai-recommendation-histories'],
    queryFn: getRecommendationHistories,
    select: (response) => response.data.content,
    enabled: isInitialized,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  if (isLoading) {
    return (
      <LoadingSpinner size="lg" className="min-h-[400px]" message="추천 내역을 불러오는 중..." />
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4">
        <EmptyComponent
          title="추천 내역을 불러올 수 없습니다"
          description="잠시 후 다시 시도해주세요."
        />
      </div>
    );
  }

  const festivals = data.recommendedFestivals || [];
  const formData = data.recommendationFormResponse;

  return (
    <div className="p-4 space-y-6 pb-20">
      {formData && <AiRecommendationSummaryCard formData={formData} />}

      {festivals.length === 0 ? (
        <EmptyComponent title="추천 내역이 없습니다" description="AI 추천을 받아보세요!" />
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-xl text-gray-900">맞춤 추천 축제</h3>
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm font-bold">
              {festivals.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {festivals.map((festival, index) => (
              <AiRecommendationFestivalCard
                key={festival.id}
                data={{
                  id: festival.id,
                  managerId: festival.managerId,
                  title: festival.title,
                  addr1: festival.addr1,
                  addr2: festival.addr2,
                  posterInfo: festival.posterInfo,
                  startDate: festival.startDate,
                  endDate: festival.endDate,
                  averageScore: festival.averageScore,
                  wishCount: festival.wishCount,
                }}

                rank={index + 1}
                reviewCount={(festival as Festival & { reviewCount?: number }).reviewCount} // 리뷰 수 추가
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendationHistoriesContent;

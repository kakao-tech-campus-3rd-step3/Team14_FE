import { useQuery } from '@tanstack/react-query';
import { getRecommendationHistories } from '@/apis/ai/getRecommendationHistories';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import EmptyComponent from '@/components/common/EmptyComponent';
import FestivalCard from '@/pages/Festivals/components/FestivalCard';

import useNav from '@/hooks/useNav';
import { useAuth } from '@/context/AuthContext'; 

const AIRecommendationHistoriesContent = () => {

  const { isInitialized } = useAuth();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ai-recommendation-histories'],
    queryFn: getRecommendationHistories,
    select: (response) => response.data.content,
    enabled: isInitialized, 
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
      {/* 추천 폼 정보 섹션 */}
      {formData && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-3">추천 조건</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">지역:</span> {formData.areaCode}
            </div>
            {formData.styles && formData.styles.length > 0 && (
              <div>
                <span className="font-semibold">스타일:</span> {formData.styles.join(', ')}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.isNewPlace && <span className="px-2 py-1 bg-blue-100 rounded">새로운 장소</span>}
              {formData.isSolo && <span className="px-2 py-1 bg-green-100 rounded">혼자</span>}
              {formData.prefersEnjoyment && <span className="px-2 py-1 bg-yellow-100 rounded">즐거움 선호</span>}
              {formData.isSpontaneous && <span className="px-2 py-1 bg-purple-100 rounded">즉흥적</span>}
            </div>
            {formData.additionalInfo && (
              <div>
                <span className="font-semibold">추가 정보:</span> {formData.additionalInfo}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 추천된 축제 목록 */}
      {festivals.length === 0 ? (
        <EmptyComponent
          title="추천 내역이 없습니다"
          description="AI 추천을 받아보세요!"
        />
      ) : (
        <>
          <h3 className="font-bold text-lg">추천된 축제 ({festivals.length})</h3>
          <div className="grid grid-cols-2 gap-6">
            {festivals.map((festival) => (
              <FestivalCard
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIRecommendationHistoriesContent;
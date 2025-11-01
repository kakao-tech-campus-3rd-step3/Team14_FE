import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';
import MAP_PINS from '@/constants/mapPins';
import PICK_STYLES from '@/constants/pickStyles';
import AIRecommendationIconInfoCard from '@/pages/AIRecommendationHistories/components/AIRecommendationIconInfoCard';
import type { RecommendationFormResponse } from '@/types/AiRecommendationTypes';

interface AIRecommendationSummaryCardProps {
  formData: RecommendationFormResponse;
}

/**
 * AI 추천 조건을 요약해서 보여주는 카드
 * 지역, 스타일, 키워드 등을 표시
 * @param formData 추천 조건 데이터
 * @returns AI 추천 조건 요약 카드
 */
const AIRecommendationSummaryCard = ({ formData }: AIRecommendationSummaryCardProps) => {
  // 헬퍼 함수들
  const getAreaIcon = (areaCode: number) => {
    const area = MAP_PINS.find((pin) => pin.areaId === String(areaCode));
    return area?.icon;
  };

  const getAreaName = (areaCode: number) => {
    const area = MAP_PINS.find((pin) => pin.areaId === String(areaCode));
    return area?.name || String(areaCode);
  };

  const getStyleIcon = (styleId: string) => {
    const style = PICK_STYLES.find((s) => s.id === styleId);
    return style?.image;
  };

  const getStyleName = (styleId: string) => {
    const style = PICK_STYLES.find((s) => s.id === styleId);
    return style?.name || styleId;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-primary-300">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-300 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <PickIcon name={PICK_ICONS.PIN} className="w-6 h-6" />
          <span className="text-white font-bold text-lg">당신의 선택</span>
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <AIRecommendationIconInfoCard
            label="지역"
            icon={getAreaIcon(formData.areaCode)}
            iconAlt={getAreaName(formData.areaCode)}
            value={getAreaName(formData.areaCode)}
          />

          {formData.styles?.slice(0, 3).map((styleId) => (
            <AIRecommendationIconInfoCard
              key={styleId}
              label="스타일"
              icon={getStyleIcon(styleId)}
              iconAlt={getStyleName(styleId)}
              value={getStyleName(styleId)}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-sm text-primary-500">festapick이 주목한 키워드</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* TODO: API 응답에 내려오는 스타일이 변경되면 수정 필요 */}
            {formData.isNewPlace && (
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                새로운 장소
              </span>
            )}
            {formData.isSolo && (
              <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                혼자
              </span>
            )}
            {formData.prefersEnjoyment && (
              <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                즐거움 선호
              </span>
            )}
            {formData.isSpontaneous && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                즉흥적
              </span>
            )}
          </div>
        </div>

        {formData.additionalInfo && (
          <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
            <span className="text-gray-600 font-semibold text-sm">추가 정보</span>
            <p className="text-gray-800 mt-1 text-sm">{formData.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationSummaryCard;

interface AiRecommendationIconInfoCardProps {
  label: string;
  icon?: string;
  iconAlt?: string;
  value: string | number;
  iconSize?: 'sm' | 'md' | 'lg';
}

/**
 * 아이콘과 정보를 표시하는 카드
 * 2x2 그리드 레이아웃에서 사용
 * @param label 라벨
 * @param icon 아이콘
 * @param iconAlt 아이콘 대체 텍스트
 * @param value 값
 * @param iconSize 아이콘 크기
 * @returns AI 추천 아이콘 정보 카드
 */
const AiRecommendationIconInfoCard = ({
  label,
  icon,
  iconAlt = '',
  value,
  iconSize = 'md',
}: AiRecommendationIconInfoCardProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
      <span className="text-gray-600 font-semibold text-sm mb-2">{label}</span>
      {icon && (
        <img
          src={icon}
          alt={iconAlt || label}
          className={`${sizeClasses[iconSize]} object-contain mb-2`}
        />
      )}
      <span className="font-bold text-gray-900 text-base">{value}</span>
    </div>
  );
};

export default AiRecommendationIconInfoCard;


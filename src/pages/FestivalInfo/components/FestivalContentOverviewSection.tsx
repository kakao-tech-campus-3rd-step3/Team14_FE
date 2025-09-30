import { useState } from 'react';
import Button from '@/components/common/Button';

const FestivalContentOverviewSection = ({ overview }: { overview: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 5-6줄 정도의 길이를 대략적으로 계산 (한 줄당 약 50자로 가정)
  const maxLength = 250;
  const shouldShowButton = overview.length > maxLength;
  const displayText =
    isExpanded || !shouldShowButton ? overview : overview.slice(0, maxLength) + '...';

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h3 className="text-sm text-gray-900 font-bold">상세정보</h3>
      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{displayText}</p>
      {shouldShowButton && (
        <div className="flex justify-center">
          <Button variant="tertiary" size="sm" fullWidth onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '접기' : '더보기'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FestivalContentOverviewSection;

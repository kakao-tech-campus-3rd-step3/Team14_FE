import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '../../../types/FestivalFormTypes';

/**
 * 축제 등록 개요 카드
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록 개요 카드 컴포넌트
 * 축제 등록 개요를 표시합니다.
 */
const RegisterFestivalOverviewCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: FestivalCardProps) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="overView" className="font-semibold">
          축제 개요 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="overView"
          name="overView"
          value={formData.overView}
          onChange={handleInputChange}
          placeholder="축제에 대한 자세한 설명을 30자 이상 입력하세요 (최대 5000자)"
          className="border border-gray-200 rounded-lg p-3 min-h-[120px]"
          disabled={isSubmitting}
          maxLength={5000}
        />
        <div className="flex justify-between text-sm">
          <span className={`${formData.overView.length < 30 ? 'text-red-500' : 'text-gray-500'}`}>
            {formData.overView.length < 30
              ? `${formData.overView.length}/30자 (최소 30자 필요)`
              : `${formData.overView.length}/5000자`}
          </span>
          {formData.overView.length > 5000 && (
            <span className="text-red-500">최대 5000자까지 입력 가능</span>
          )}
        </div>
      </div>
    </BorderCardComponent>
  );
};

export default RegisterFestivalOverviewCard;

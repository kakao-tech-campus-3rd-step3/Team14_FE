import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '@/types/FestivalFormTypes';
import TextInputWithCounter from '@/components/form/TextInputWithCounter';
/**
 * 축제 등록,수정 폼 개요 카드
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록,수정 폼 개요 카드 컴포넌트
 * 축제 등록,수정 폼 개요를 표시합니다.
 */
const FestivalFormOverviewCard = ({
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
        <TextInputWithCounter
          name="overView"
          value={formData.overView}
          onChange={handleInputChange}
          placeholder="축제에 대한 자세한 설명을 30자 이상 입력하세요 (최대 5000자)"
          maxLength={5000}
          minLength={30}
          type="textarea"
          disabled={isSubmitting}
          rows={10}
          showMinLengthMessage={true}
          minLengthMessage="최소 30자 이상 입력해주세요"
          errorClassName="text-red-500"
        />
      </div>
    </BorderCardComponent>
  );
};

export default FestivalFormOverviewCard;

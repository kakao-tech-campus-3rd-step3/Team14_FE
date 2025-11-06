import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '@/types/FestivalFormTypes';
import TextInputWithCounter from '../form/TextInputWithCounter';

/**
 * 축제 등록,수정 폼 제목 카드
 * 축제 제목은 최대 255자까지 입력 가능합니다.
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록,수정 폼 제목 카드 컴포넌트
 * 축제 등록,수정 폼 제목을 표시합니다.
 */
const FestivalFormNameCard = ({ formData, handleInputChange, isSubmitting }: FestivalCardProps) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold">
          축제 제목 <span className="text-red-500">*</span>
        </label>
        <TextInputWithCounter
          value={formData.title}
          onChange={handleInputChange}
          placeholder="축제 제목을 입력하세요"
          maxLength={255}
          type="input"
          name="title"
          disabled={isSubmitting}
        />
      </div>
    </BorderCardComponent>
  );
};

export default FestivalFormNameCard;

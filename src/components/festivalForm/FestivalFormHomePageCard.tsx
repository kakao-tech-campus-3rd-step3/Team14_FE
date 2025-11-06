import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '@/types/FestivalFormTypes';
import TextInputWithCounter from '../form/TextInputWithCounter';

/**
 * 축제 등록,수정 폼 홈페이지 카드
 * 홈페이지 URL은 최대 500자까지 입력 가능합니다.
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록,수정 폼 홈페이지 카드 컴포넌트
 * 축제 등록,수정 폼 홈페이지를 표시합니다.
 */
const FestivalFormHomePageCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: FestivalCardProps) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="homePage" className="font-semibold">
          홈페이지 URL
        </label>
        <TextInputWithCounter
          value={formData.homePage}
          onChange={handleInputChange}
          placeholder="https://example.com"
          maxLength={500}
          type="input"
          name="homePage"
          disabled={isSubmitting}
        />
      </div>
    </BorderCardComponent>
  );
};

export default FestivalFormHomePageCard;

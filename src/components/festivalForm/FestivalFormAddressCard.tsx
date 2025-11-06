import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '@/types/FestivalFormTypes';
import TextInputWithCounter from '../form/TextInputWithCounter';

/**
 * 축제 등록,수정 폼 주소 카드
 * 주소는 최대 255자까지 입력 가능합니다.
 * 상세 주소는 최대 255자까지 입력 가능합니다.
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록,수정 폼 주소 카드 컴포넌트
 * 축제 등록,수정 폼 주소를 표시합니다.
 */
const FestivalFormAddressCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: FestivalCardProps) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="addr1" className="font-semibold">
          주소 <span className="text-red-500">*</span>
        </label>
        <TextInputWithCounter
          value={formData.addr1}
          onChange={handleInputChange}
          placeholder="기본 주소를 입력하세요"
          maxLength={255}
          type="input"
          name="addr1"
          disabled={isSubmitting}
        />
        <TextInputWithCounter
          value={formData.addr2}
          onChange={handleInputChange}
          placeholder="상세 주소를 입력하세요 (선택)"
          maxLength={255}
          type="input"
          name="addr2"
          disabled={isSubmitting}
        />
      </div>
    </BorderCardComponent>
  );
};

export default FestivalFormAddressCard;

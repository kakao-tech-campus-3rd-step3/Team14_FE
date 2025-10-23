import BorderCardComponent from '@/components/common/BorderCardComponent';
import type { FestivalCardProps } from '../../../types/FestivalFormTypes';

/**
 * 축제 등록 기간 카드
 * @param formData - 폼 데이터
 * @param handleInputChange - 입력 변경 핸들러
 * @param isSubmitting - 제출 중 여부
 * @returns 축제 등록 기간 카드 컴포넌트
 * 축제 등록 기간을 표시합니다.
 */
const RegisterFestivalPeriodCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: FestivalCardProps) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          축제 기간 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg p-3 flex-1"
            disabled={isSubmitting}
          />
          <span>~</span>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg p-3 flex-1"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </BorderCardComponent>
  );
};

export default RegisterFestivalPeriodCard;

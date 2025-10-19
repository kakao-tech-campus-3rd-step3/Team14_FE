import BorderCardComponent from '@/components/common/BorderCardComponent';
import AREA_OPTIONS from '@/constants/areaOptions';

const RegisterFestivalAreaCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: {
  formData: any;
  handleInputChange: any;
  isSubmitting: any;
}) => {
  // 사용자가 축제를 등록할때는 지역에서 전국은 선택할 수 없도록 제외하였습니다.
  const filteredAreaOptions = AREA_OPTIONS.filter((option) => option.value !== '0');

  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="areaCode" className="font-semibold">
          지역 <span className="text-red-500">*</span>
        </label>
        <select
          id="areaCode"
          name="areaCode"
          value={formData.areaCode}
          onChange={handleInputChange}
          className="border border-gray-200 rounded-lg p-3 "
          disabled={isSubmitting}
        >
          {filteredAreaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </BorderCardComponent>
  );
};

export default RegisterFestivalAreaCard;

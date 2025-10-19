import BorderCardComponent from '@/components/common/BorderCardComponent';

const RegisterFestivalAddressCard = ({
  formData,
  handleInputChange,
  isSubmitting,
}: {
  formData: any;
  handleInputChange: any;
  isSubmitting: any;
}) => {
  return (
    <BorderCardComponent>
      <div className="flex flex-col gap-2">
        <label htmlFor="addr1" className="font-semibold">
          주소 <span className="text-red-500">*</span>
        </label>
        <input
          id="addr1"
          name="addr1"
          type="text"
          value={formData.addr1}
          onChange={handleInputChange}
          placeholder="기본 주소를 입력하세요"
          className="border border-gray-200 rounded-lg p-3"
          disabled={isSubmitting}
        />
        <input
          id="addr2"
          name="addr2"
          type="text"
          value={formData.addr2}
          onChange={handleInputChange}
          placeholder="상세 주소를 입력하세요 (선택)"
          className="border border-gray-200 rounded-lg p-3"
          disabled={isSubmitting}
        />
      </div>
    </BorderCardComponent>
  );
};

export default RegisterFestivalAddressCard;

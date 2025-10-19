import BorderCardComponent from "@/components/common/BorderCardComponent"

const RegisterFestivalPeriodCard = ({ formData, handleInputChange, isSubmitting }: { formData: any, handleInputChange: any, isSubmitting: any }) => {
  return (        <BorderCardComponent>
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
  </div></BorderCardComponent>);
};

export default RegisterFestivalPeriodCard;
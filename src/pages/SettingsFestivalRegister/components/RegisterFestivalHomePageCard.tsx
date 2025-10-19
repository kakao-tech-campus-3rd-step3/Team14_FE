import BorderCardComponent from "@/components/common/BorderCardComponent"

const RegisterFestivalHomePageCard = ({ formData, handleInputChange, isSubmitting }: { formData: any, handleInputChange: any, isSubmitting: any }) => {
  return (        <BorderCardComponent>
    <div className="flex flex-col gap-2">
    <label htmlFor="homePage" className="font-semibold">
      홈페이지 URL
    </label>
    <input
      id="homePage"
      name="homePage"
      type="url"
      value={formData.homePage}
      onChange={handleInputChange}
      placeholder="https://example.com"
      className="border border-gray-200 rounded-lg p-3"
      disabled={isSubmitting}
    />
  </div></BorderCardComponent>);
};

export default RegisterFestivalHomePageCard;
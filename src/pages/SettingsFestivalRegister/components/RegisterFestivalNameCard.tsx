import BorderCardComponent from "@/components/common/BorderCardComponent";

const RegisterFestivalNameCard = ({ formData, handleInputChange, isSubmitting }: { formData: any, handleInputChange: any, isSubmitting: any }) => {
  return (      <BorderCardComponent>
    <div className="flex flex-col gap-2">
      <label htmlFor="title" className="font-semibold">
        축제 제목 <span className="text-red-500">*</span>
      </label>
      <input
id="title"
name="title"
type="text"
value={formData.title}
onChange={handleInputChange}
placeholder="축제 제목을 입력하세요"
className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary-300"
disabled={isSubmitting}
/>
    </div>
    </BorderCardComponent>);
};

export default RegisterFestivalNameCard;
export interface FestivalFormData {
  title: string;
  areaCode: string;
  addr1: string;
  addr2: string;
  startDate: string;
  endDate: string;
  homePage: string;
  overView: string;
}

export interface FestivalCardProps {
  formData: FestivalFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  isSubmitting: boolean;
}

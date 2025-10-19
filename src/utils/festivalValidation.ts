export interface FestivalFormData {
  title: string;
  addr1: string;
  startDate: string;
  endDate: string;
  overView: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateFestivalForm = (
  formData: FestivalFormData,
  posterInfo: { id: number; presignedUrl: string } | null,
  imageInfos: Array<{ id: number; presignedUrl: string }>
): ValidationResult => {
  if (!formData.title.trim()) {
    return { isValid: false, errorMessage: '축제 제목을 입력해주세요.' };
  }

  if (!posterInfo) {
    return { isValid: false, errorMessage: '포스터 이미지를 업로드해주세요.' };
  }

  if (imageInfos.length === 0) {
    return { isValid: false, errorMessage: '축제 이미지를 최소 1개 이상 업로드해주세요.' };
  }

  if (!formData.startDate || !formData.endDate) {
    return { isValid: false, errorMessage: '축제 시작일과 종료일을 입력해주세요.' };
  }

  if (new Date(formData.startDate) > new Date(formData.endDate)) {
    return { isValid: false, errorMessage: '종료일은 시작일 이후여야 합니다.' };
  }

  if (!formData.addr1.trim()) {
    return { isValid: false, errorMessage: '주소를 입력해주세요.' };
  }

  if (!formData.overView.trim()) {
    return { isValid: false, errorMessage: '축제 개요를 입력해주세요.' };
  }

  if (formData.overView.length < 30) {
    return { isValid: false, errorMessage: '축제 개요는 최소 30자 이상 입력해주세요.' };
  }

  if (formData.overView.length > 5000) {
    return { isValid: false, errorMessage: '축제 개요는 최대 5000자까지 입력 가능합니다.' };
  }

  return { isValid: true };
};

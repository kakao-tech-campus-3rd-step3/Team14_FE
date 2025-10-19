import Button from '@/components/common/Button';

interface FormSubmitButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void; // optional로 변경
  onPatch?: () => void; // optional로 변경
  isEdit?: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  submitType?: 'button' | 'submit'; // 추가
}
/**
 * 폼 제출 버튼 컴포넌트 - 리뷰, 축제 관리자 승급 신청 페이지에서 사용
 * @param onCancel - 취소 버튼 클릭 시 실행되는 함수
 * @param onSubmit - 제출 버튼 클릭 시 실행되는 함수
 * @param isDisabled - 제출 버튼 비활성화 여부
 * @param isLoading - 제출 버튼 로딩 여부
 * @param submitLabel - 제출 버튼 라벨
 * @param loadingLabel - 로딩 버튼 라벨
 * @param cancelLabel - 취소 버튼 라벨
 * @returns 폼 제출 버튼 컴포넌트
 */
const FormSubmitButtons = ({
  onCancel,
  onSubmit,
  onPatch,
  isEdit = false,
  isDisabled,
  isLoading,
  submitLabel = isEdit ? '수정하기' : '제출하기',
  cancelLabel = '취소',
  submitType = 'button', // 기본값 'button'
}: FormSubmitButtonsProps) => {
  return (
    <div className="flex gap-3 mt-4 pb-20">
      {' '}
      {/* pb-20 추가 */}
      <Button variant="secondary" className="flex-1" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button
        type={submitType} // type 동적으로 설정
        variant="primary"
        className="flex-1"
        onClick={submitType === 'button' ? (isEdit ? onPatch : onSubmit) : undefined}
        disabled={isDisabled}
      >
        {isLoading ? (isEdit ? '수정 중...' : '제출 중...') : submitLabel}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;

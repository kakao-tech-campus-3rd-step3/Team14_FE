import TextInputWithCounter from '@/components/form/TextInputWithCounter';

interface ApplicationDepartmentCardProps {
  department: string;
  setDepartment: (department: string) => void;
  disabled?: boolean;
}
/**
 * 축제 관리자 승급 신청자의 소속을 적는 카드
 * @param disabled - 비활성화 상태 - 수정 모드일 때는 소속을 변경할 수 없도록 비활성화 상태로 설정합니다.
 * @param department - 축제 관리자 승급 신청자의 소속
 * @param setDepartment - 축제 관리자 승급 신청자의 소속을 설정하는 함수
 * @returns 카드 컴포넌트
 */
const ApplicationDepartmentCard = ({
  department,
  setDepartment,
  disabled = false,
}: ApplicationDepartmentCardProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="department" className="block font-semibold mb-2">
        소속 <span className="text-red-500">*</span>
      </label>
      <TextInputWithCounter
        name="department"
        type="input"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="예: 부산대학교 축제기획위원회"
        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
        showMinLengthMessage={true}
        minLengthMessage="최소 2자 이상 입력해주세요"
        minLength={2}
        maxLength={50}
        disabled={disabled}
      />
      <p className="text-xs text-gray-500 mt-1">
        소속된 단체, 기관, 부서명을 정확히 입력해주세요. (2-50자)
      </p>
    </div>
  );
};

export default ApplicationDepartmentCard;

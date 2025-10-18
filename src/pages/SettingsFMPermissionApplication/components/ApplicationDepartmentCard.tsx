interface ApplicationDepartmentCardProps {
  department: string;
  setDepartment: (department: string) => void;
}
/**
 * 축제 관리자 승급 신청자의 소속을 적는 카드
 * @param department - 축제 관리자 승급 신청자의 소속
 * @param setDepartment - 축제 관리자 승급 신청자의 소속을 설정하는 함수
 * @returns 카드 컴포넌트
 */
const ApplicationDepartmentCard = ({
  department,
  setDepartment,
}: ApplicationDepartmentCardProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="department" className="block font-semibold mb-2">
        소속 부서 <span className="text-red-500">*</span>
      </label>
      <input
        id="department"
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="예: 부산대학교 축제기획위원회"
        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
        maxLength={50}
      />
      <p className="text-xs text-gray-500 mt-1">
        소속된 단체, 기관, 부서명을 정확히 입력해주세요. (2-50자)
      </p>
    </div>
  );
};

export default ApplicationDepartmentCard;

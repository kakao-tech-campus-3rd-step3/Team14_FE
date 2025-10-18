/**
 * 축제 관리자 승급 신청자를 위한 안내사항을 적는 카드
 * @returns 카드 컴포넌트
 */
const ApplicaitonInfoCard = () => {
  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
    <h4 className="text-sm font-medium text-blue-900 mb-1">안내사항</h4>
    <ul className="text-xs text-blue-800 space-y-1">
      <li>• 신청서 검토에는 영업일 기준 3~5일이 소요됩니다.</li>
      <li>• 승인 결과는 설정 페이지에서 확인할 수 있습니다.</li>
      <li>• 허위 서류 제출 시 계정이 정지될 수 있습니다.</li>
      <li>• 제출한 서류는 관리자 권한 심사 용도로만 사용됩니다.</li>
    </ul>
  </div>
  );
};

export default ApplicaitonInfoCard;
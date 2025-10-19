import Button from "@/components/common/Button";

/**
 * 축제 관리자로 나를 신청할 수 있는 색션
 * @returns 축제 관리자 섹션 컴포넌트
 */
const FestivalContentManagerSection = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-gray-900 font-bold">이 축제의 관리자라면?</h3>
      <div className="flex items-center justify-between mr-2">
      <p className="text-sm text-gray-900">축제 관리자가 되어 축제를 관리해보세요!</p>
      <Button variant="link" onClick={() => {}}>
        축제 관리 신청하기
      </Button>
      </div>
    </div>
  );
};

export default FestivalContentManagerSection;
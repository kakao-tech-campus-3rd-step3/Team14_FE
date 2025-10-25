import PickIcon from '@/components/common/PickIcon';
import { PICK_ICONS } from '@/constants/pickIcons';

const FestivalInfoNoticeRuleCard = () => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
        <PickIcon name={PICK_ICONS.PIN} size={20} className="mr-2" />
        안내사항
      </h4>
      <ul className="text-sm text-blue-800 space-y-1">
        <li>• 이 축제의 관리자만 공지사항을 작성할 수 있습니다.</li>
        <li>• 공지사항의 제목을 꼭 입력해주세요.</li>
        <li>• 공지사항의 내용을 입력해주세요.</li>
        <li>• 공지사항의 이미지를 첨부해주세요.</li>
      </ul>
    </div>
  );
};

export default FestivalInfoNoticeRuleCard;

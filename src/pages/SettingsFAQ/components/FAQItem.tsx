interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}
/**
 * 자주 묻는 질문 아이템 컴포넌트
 * @param question - 질문
 * @param answer - 답변
 * @returns 자주 묻는 질문 아이템 컴포넌트
 * 주로 축제 등록,관리 관한 사항들 적어두었습니다.
 */
const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 text-left">
          <span className="text-primary font-bold text-lg shrink-0">Q.</span>
          <span className="font-medium text-gray-900">{question}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-lg shrink-0">A.</span>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;


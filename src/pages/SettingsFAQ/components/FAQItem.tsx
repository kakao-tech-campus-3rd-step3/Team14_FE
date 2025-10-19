interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* 질문 (클릭 가능) */}
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

      {/* 답변 (펼쳐졌을 때만 표시) */}
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


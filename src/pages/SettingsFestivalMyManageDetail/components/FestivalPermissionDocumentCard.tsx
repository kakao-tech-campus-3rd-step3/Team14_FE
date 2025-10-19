
interface FestivalPermissionDocumentCardProps {
  docs: string[];
}
const FestivalPermissionDocumentCard = ({ docs }: FestivalPermissionDocumentCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">제출한 증빙 서류</h3>
      <div className="space-y-2">
        {docs.map((doc, index) => (
          <a
            key={index}
            href={doc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📎</span>
              <span className="text-sm text-gray-700">서류 {index + 1}</span>
            </div>
            <span className="text-sm text-blue-600">보기 →</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FestivalPermissionDocumentCard;
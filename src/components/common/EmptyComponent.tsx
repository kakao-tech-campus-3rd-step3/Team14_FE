interface EmptyComponentProps {
  title: string;
  description: string;
  className?: string;
}
/**
 * 빈 컴포넌트 (데이터가 없을 때 표시)
 * @param title - 제목
 * @param description - 설명
 * @returns 빈 컴포넌트
 */
const EmptyComponent = ({ title, description, className }: EmptyComponentProps) => {
  return (
    <div className={className || 'flex flex-col items-center justify-center h-64'}>
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  );
};

export default EmptyComponent;

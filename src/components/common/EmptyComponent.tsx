interface EmptyComponentProps {
  title: string;
  description: string;
}
const EmptyComponent = ({ title, description }: EmptyComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  );
};

export default EmptyComponent;

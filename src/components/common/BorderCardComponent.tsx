const BorderCardComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 border-white rounded-lg shadow-sm">{children}</div>;
};

export default BorderCardComponent;

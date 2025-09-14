interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100">
      <div className="min-h-[calc(100vh-theme(spacing.12))] pt-12 pb-15 max-w-[480px] w-full relative bg-white ">
        {children}
      </div>
    </div>
  );
};

export default Container;

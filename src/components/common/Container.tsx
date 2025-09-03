interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100">
      <div className="min-h-screen max-w-[720px] w-full relative bg-white">{children}</div>
    </div>
  );
};

export default Container;

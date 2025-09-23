interface ContainerProps {
  children: React.ReactNode;
}

/**
 * Container 컴포넌트
 * @param children - 컴테이너 내부에 표시될 콘텐츠
 */
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100">
      <div className="min-h-screen pt-12 pb-15 max-w-[480px] w-full relative bg-white ">
        {children}
      </div>
    </div>
  );
};

export default Container;

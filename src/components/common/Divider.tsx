/**
 * Divider 컴포넌트
 * @description 구분선 컴포넌트
 * @param height - 구분선 높이 (기본값: 1px)
 */
const Divider = ({ height = '1px' }: { height?: string }) => {
  return <div className={`w-full bg-gray-400`} style={{ height }} />;
};

export default Divider;

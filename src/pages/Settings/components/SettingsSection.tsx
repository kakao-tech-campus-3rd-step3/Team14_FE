interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}
/**
 * 설정 섹션 컴포넌트
 * @param title - 섹션 제목
 * @param children - 섹션 내용
 * @returns 설정 섹션 컴포넌트
 * 설정 섹션을 표시합니다.
 */
const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <p className="text-lg font-bold">{title}</p>
      <div>{children}</div>
      <div className="w-full h-[1px] bg-gray-200" />
    </div>
  );
};

export default SettingsSection;

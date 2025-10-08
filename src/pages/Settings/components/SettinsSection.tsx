interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const SettingsSection = ({ title, children }: SettingsSectionProps) => {
    return (
      <div className="w-full flex flex-col items-start gap-4">
        <p className="text-lg font-bold">{title}</p>
        <div>
          {children}
        </div>
        <div className="w-full h-[1px] bg-gray-200" />
      </div>
    );
  };
  
  export default SettingsSection;
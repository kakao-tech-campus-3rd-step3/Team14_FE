import type { ComponentPropsWithoutRef } from 'react';

interface OutlineInputFieldProps extends ComponentPropsWithoutRef<'input'> {
  errorMsg?: string;
  rounded?: 'md' | 'lg' | 'xl' | 'none';
}
/**
 *
 * @param errorMsg
 * 에러 메시지를 입력할 수 있는 필드
 * @param rounded
 * 라운드 처리 여부와 크기를 지정 : md | lg | xl | none
 * @param props
 * 기타 input 속성들
 * @returns
 */
const OutlineInputField = ({ errorMsg, rounded = 'none', ...props }: OutlineInputFieldProps) => {
  return (
    <div className="w-full h-full gap-1">
      <input
        {...props}
        className={`w-full h-[3rem] border border-gray-300 rounded-${rounded} py-2 px-3 focus:outline-primary-300`}
      />
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
    </div>
  );
};

export default OutlineInputField;

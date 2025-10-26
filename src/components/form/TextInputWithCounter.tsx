interface TextInputWithCounterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  maxLength: number;
  type?: 'input' | 'textarea';
  minLength?: number;
  className?: string;
  disabled?: boolean;
  rows?: number;
  showMinLengthMessage?: boolean;
  minLengthMessage?: string;
  errorClassName?: string;
}
/**
 * TextInputWithCounter 컴포넌트
 * @param value - 입력값
 * @param onChange - 입력값 변경 핸들러
 * @param placeholder - 입력 플레이스홀더
 * @param maxLength - 최대 길이
 * @param type - 입력 타입 (input 또는 textarea)
 * @param minLength - 최소 길이
 * @param className - 커스텀 스타일
 * @param disabled - 비활성화 상태
 * @param rows - textarea 행 수
 * @returns TextInputWithCounter 컴포넌트
 */
const TextInputWithCounter = ({
  value,
  onChange,
  placeholder,
  maxLength,
  type = 'input',
  minLength,
  className = '',
  disabled = false,
  rows = 1,
  showMinLengthMessage = false,
  errorClassName = 'text-red-500',
}: TextInputWithCounterProps) => {
  const isMinLengthError = minLength && value.length < minLength;
  const isMaxLengthError = value.length > maxLength;

  return (
    <div className="mb-4">
      {type === 'input' ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 bg-gray-50 rounded-lg border-0 ${className}`}
          maxLength={maxLength}
          disabled={disabled}
        />
      ) : (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 bg-gray-50 rounded-lg border-0 ${className}`}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
        />
      )}

      <div className="flex justify-between text-sm">
        <span className={isMinLengthError ? errorClassName : 'text-gray-500'}>
          {showMinLengthMessage && minLength && value.length < minLength
            ? `${value.length}/${minLength}자 (최소 ${minLength}자 필요)`
            : `${value.length}/${maxLength}자`}
        </span>
        {isMaxLengthError && (
          <span className={errorClassName}>최대 {maxLength}자까지 입력 가능</span>
        )}
      </div>
    </div>
  );
};
export default TextInputWithCounter;

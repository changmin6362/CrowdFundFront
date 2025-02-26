interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  inputRef,
}: InputProps) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="box-circle remove-outline px-2"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      tabIndex={0}
      autoComplete="off"
    />
  );
}

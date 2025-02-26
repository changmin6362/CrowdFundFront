interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onFocus,
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
      onKeyDown={onKeyDown}
      tabIndex={0}
    />
  );
}

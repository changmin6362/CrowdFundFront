interface InputProps {
  placeholder: string;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function Input({
  placeholder,
  value,
  handleInputChange,
  handleKeyDown,
  inputRef,
}: InputProps) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="box-circle px-2"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
}

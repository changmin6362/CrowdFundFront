import Input from "@/app/components/ui/input";
export default function TextSearch({
  value,
  onChange,
  onSearch,
  inputRef,
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <Input
      placeholder="포켓몬 이름으로 검색"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
    />
  );
}

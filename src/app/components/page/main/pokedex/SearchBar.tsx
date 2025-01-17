import { useState } from "react";
import Input from "@/app/components/ui/Input";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");

  // 입력값 변경 이벤트 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // 키보드 이벤트 핸들러 (엔터키 입력 시 검색 실행)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  return (
    <Input
      placeholder="포켓몬 이름으로 검색"
      value={inputValue}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      inputRef={inputRef}
    />
  );
}

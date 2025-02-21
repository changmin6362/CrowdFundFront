import { useState } from "react";

import TextSearch from "@/app/components/page/main/pokedex/components/searchBar/textSearch";
import ImageSearch from "./imageSearch";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");

  // 텍스트 검색 핸들러
  const handleTextSearch = () => handleSearch(inputValue);

  // 이미지 검색 핸들러
  const handleOCRTextSearch = (text: string) => {
    setInputValue(text);
    handleSearch(text);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ImageSearch onOCRTextSearch={handleOCRTextSearch}>
        <TextSearch
          value={inputValue}
          onChange={setInputValue}
          onSearch={handleTextSearch}
          inputRef={inputRef}
        />
      </ImageSearch>
    </div>
  );
}

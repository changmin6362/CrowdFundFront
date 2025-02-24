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

  return (
    <div className="flex flex-col items-center gap-4">
      <ImageSearch setInputValue={setInputValue} handleSearch={handleSearch}>
        <TextSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
          inputRef={inputRef}
        />
      </ImageSearch>
    </div>
  );
}

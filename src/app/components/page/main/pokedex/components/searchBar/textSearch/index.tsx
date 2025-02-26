import { useState } from "react";

import Input from "@/app/components/ui/input";
import Dropdown from "@/app/components/ui/dropdown";
import useAutoComplete from "@/hooks/autoComplete/useAutoComplete";

interface TextSearchProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function TextSearch({
  inputValue,
  setInputValue,
  handleSearch,
  inputRef,
}: TextSearchProps) {
  const { autoCompleteItems, updateAutoCompleteList } = useAutoComplete();

  // 현재 선택된 자동완성 항목의 인덱스
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // input에 focus중인지 확인하는 상태
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    updateAutoCompleteList(newValue);
    setSelectedIndex(-1);
  };

  const onSelectItem = (selectedValue: string) => {
    setInputValue(selectedValue);
    handleSearch(selectedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME 조합 중일 때는 이벤트 처리하지 않음
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(inputValue);
    }

    if (e.key === "Tab") {
      e.preventDefault();

      if (autoCompleteItems.length > 0) {
        // 마지막 아이템에 도달하면 다시 0부터 시작
        const nextIndex = (selectedIndex + 1) % autoCompleteItems.length;
        setSelectedIndex(nextIndex);
        setInputValue(autoCompleteItems[nextIndex]);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="포켓몬 이름으로 검색"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputRef={inputRef}
      />
      <Dropdown
        items={autoCompleteItems}
        isOpen={isFocused && autoCompleteItems.length > 0}
        onSelect={onSelectItem}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

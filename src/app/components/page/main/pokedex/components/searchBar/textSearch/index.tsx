import { useState } from "react";

import Input from "@/app/components/ui/input";
import Dropdown from "@/app/components/ui/dropdown";
import useAutoComplete from "@/hooks/autoComplete/useAutoComplete";

import { MAX_AUTO_COMPLETE_ITEMS } from "@/constants/pokedexList";

export default function TextSearch({
  inputValue,
  setInputValue,
  handleSearch,
  inputRef,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  // 현재 선택된 자동완성 항목의 인덱스
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { autoCompleteItems, updateAutoCompleteList, clearAutoCompleteList } =
    useAutoComplete();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    updateAutoCompleteList(newValue);
    setSelectedIndex(-1);
  };

  const onSelectItem = (selectedValue: string) => {
    setInputValue(selectedValue);
    clearAutoCompleteList();
    handleSearch(selectedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME 조합 중일 때는 이벤트 처리하지 않음
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Tab" && autoCompleteItems.length > 0) {
      e.preventDefault();

      // MAX_AUTO_COMPLETE_ITEMS개수에 도달하면 다시 0부터 시작
      const nextIndex = (selectedIndex + 1) % MAX_AUTO_COMPLETE_ITEMS;
      setSelectedIndex(nextIndex);
      setInputValue(autoCompleteItems[nextIndex]);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onSelectItem(autoCompleteItems[selectedIndex]);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="포켓몬 이름으로 검색"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
      <Dropdown
        items={autoCompleteItems}
        isOpen={autoCompleteItems.length > 0}
        onSelect={onSelectItem}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

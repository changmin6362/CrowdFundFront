import Input from "@/app/components/ui/input";
import Dropdown from "@/app/components/ui/dropdown";
import useAutoComplete from "@/hooks/autoComplete/useAutoComplete";

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
  // 자동완성 관련 로직
  const {
    autoCompleteList,
    selectedIndex,
    setSelectedIndex,
    isOpen,
    updateAutoCompleteList,
    clearAutoCompleteList,
  } = useAutoComplete();

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    updateAutoCompleteList(value);
  };

  // 자동완성 항목 선택 핸들러
  const handleSelectItem = (selectedValue: string) => {
    setInputValue(selectedValue);
    clearAutoCompleteList();
    handleSearch(selectedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        Math.min(prev + 1, autoCompleteList.length - 1),
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelectItem(autoCompleteList[selectedIndex]);
      } else {
        handleSearch(inputValue);
      }
    }
  };

  // 포커스 핸들러
  const handleFocus = () => updateAutoCompleteList(inputValue);

  // 블러 핸들러
  const handleBlur = () => setTimeout(clearAutoCompleteList, 150);

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
        items={autoCompleteList}
        isOpen={isOpen}
        onSelect={handleSelectItem}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

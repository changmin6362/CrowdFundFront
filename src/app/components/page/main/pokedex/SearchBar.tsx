import { useState, useRef } from "react";
import Input from "@/app/components/ui/input/";
import useOCR from "@/hooks/ocr/useOCR";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");
  const { processImage, isProcessing } = useOCR();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await processImage(file);
      setInputValue(text);
      handleSearch(text);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* 사용자가 글씨를 입력할 수 있는 input */}
      <Input
        placeholder={
          isProcessing ? "이미지 처리 중..." : "포켓몬 이름으로 검색"
        }
        value={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
      {/* 숨겨진 파일 입력 input*/}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {/* 파일 입력 동작을 수행하는 버튼 */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="btn-primary ml-2"
      >
        {isProcessing ? "처리 중..." : "이미지 업로드"}
      </button>
    </div>
  );
}

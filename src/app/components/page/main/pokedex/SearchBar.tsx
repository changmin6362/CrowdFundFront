import { useState } from "react";

import TextSearch from "./searchBar/textSearch/";
import ImageUploadButton from "./searchBar/imageSearch/imageUploadButton";
import ImageCropModal from "./searchBar/imageSearch/imageCropModal";
import useOCR from "@/hooks/ocr/useOCR";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");
  // OCR 처리 관련 커스텀 훅
  const { processImage, isProcessing } = useOCR();

  // 선택된 이미지의 URL 상태 관리
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 텍스트 검색 핸들러
  const handleTextSearch = () => handleSearch(inputValue);

  // 이미지 파일 선택 핸들러
  const handleImageSearch = async (file: File) => {
    setSelectedImage(file);
  };

  interface CropArea {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  // 크롭 영역 확정 처리
  const handleConfirmCrop = async (cropArea: CropArea) => {
    if (!selectedImage) return;

    // OCR 처리 실행
    const text = await processImage(selectedImage, cropArea);
    if (text) {
      setInputValue(text);
      handleSearch(text);
    }
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 이미지 크롭 필드 */}
      {selectedImage && (
        <ImageCropModal
          imageSrc={URL.createObjectURL(selectedImage)}
          onConfirm={handleConfirmCrop}
          onCancel={() => setSelectedImage(null)}
          isProcessing={isProcessing}
        />
      )}
      {/* 입력 필드 */}
      <div className="flex w-full items-center justify-center">
        <TextSearch
          value={inputValue}
          onChange={setInputValue}
          onSearch={handleTextSearch}
          inputRef={inputRef}
        />
        <ImageUploadButton
          onSelect={handleImageSearch}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

import { useState } from "react";

import TextSearch from "./searchBar/textSearch/";
import ImageUploadButton from "./searchBar/imageSearch/imageUploadButton";
import ImageCropModal from "./searchBar/imageSearch/imageCropModal";
import useOCR from "@/hooks/ocr/useOCR";
import useImageCrop from "@/hooks/imageCrop/useImageCrop";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");
  // OCR 처리 관련 커스텀 훅
  const { processImage, isProcessing } = useOCR();

  const {
    selectedImage,
    crop,
    setCrop,
    handleImageSelect,
    handleImageLoad,
    handleCropCancel,
    calculateCropRect,
  } = useImageCrop();
  // 텍스트 검색 핸들러
  const handleTextSearch = () => handleSearch(inputValue);

  // 크롭 영역 확정 처리
  const handleCropConfirm = async () => {
    if (!selectedImage) return;

    const cropRect = calculateCropRect(crop);
    // OCR 처리 실행
    const text = await processImage(selectedImage, cropRect);
    if (text) {
      setInputValue(text);
      handleSearch(text);
    }
    handleCropCancel();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 이미지 크롭 필드 */}
      {selectedImage && (
        <ImageCropModal
          imageSrc={URL.createObjectURL(selectedImage)}
          crop={crop}
          onCropChange={setCrop}
          onImageLoad={handleImageLoad}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
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
          onSelect={handleImageSelect}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

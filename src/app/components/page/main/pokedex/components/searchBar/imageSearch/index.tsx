import useImageCrop from "@/hooks/imageCrop/useImageCrop";
import useOCR from "@/hooks/ocr/useOCR";

import ImageCropModal from "./imageCropModal/";
import ImageUploadButton from "./imageUploadButton/";

interface ImageSearchProps {
  setInputValue: (value: string) => void;
  handleSearch: (value: string) => void;
  children: React.ReactNode;
}

export default function ImageSearch({
  setInputValue,
  handleSearch,
  children,
}: ImageSearchProps) {
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

  // 크롭 영역 확정 처리
  const handleCropConfirm = async () => {
    if (!selectedImage) return;

    const cropRect = calculateCropRect(crop);
    // OCR로 text 변환
    const text = await processImage(selectedImage, cropRect);
    setInputValue(text);
    handleSearch(text);
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
        {children}
        <ImageUploadButton
          onSelect={handleImageSelect}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

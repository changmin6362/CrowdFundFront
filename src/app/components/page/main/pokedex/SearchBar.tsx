import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Input from "@/app/components/ui/input/";
import useOCR from "@/hooks/ocr/useOCR";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Portal from "@/app/components/ui/portal";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ handleSearch, inputRef }: SearchBarProps) {
  // 검색창의 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");
  const { processImage, isProcessing } = useOCR();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 크롭을 위한 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [imageSize, setImageSize] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
  });

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

  // 이미지 로드 시 원본 크기 저장
  const handleImageLoad = (img: HTMLImageElement) => {
    setImageSize({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    });
    // 초기 크롭 영역 설정
    setCrop({
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  };

  // 크롭 영역 계산
  const getCroppedImage = useCallback(async () => {
    if (
      !crop ||
      !selectedImage ||
      !imageSize.naturalWidth ||
      !imageSize.naturalHeight
    )
      return;

    const cropRect = {
      left: Math.round((crop.x / 100) * imageSize.naturalWidth),
      top: Math.round((crop.y / 100) * imageSize.naturalHeight),
      width: Math.round((crop.width / 100) * imageSize.naturalWidth),
      height: Math.round((crop.height / 100) * imageSize.naturalHeight),
    };

    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    return processImage(file, cropRect);
  }, [crop, selectedImage, imageSize, processImage]);

  // OCR 실행 핸들러
  const handleOCR = async () => {
    if (!selectedImage) return;

    const text = await getCroppedImage();
    if (text) {
      setInputValue(text);
      handleSearch(text);
    }
    setSelectedImage(null);
  };

  const handleCloseCrop = () => setSelectedImage(null);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 포털을 통한 크롭 모달 렌더링 */}
      {selectedImage && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4">
              <ReactCrop crop={crop} onChange={setCrop}>
                <Image
                  src={selectedImage}
                  alt="Crop preview"
                  width={1200}
                  height={800}
                  style={{ objectFit: "contain" }}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    handleImageLoad(img);
                  }}
                  unoptimized
                />
              </ReactCrop>

              {/* 컨트롤 버튼 그룹 */}
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={handleCloseCrop} className="btn-secondary">
                  닫기
                </button>
                <button
                  onClick={handleOCR}
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? "인식 중..." : "OCR 실행"}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* 기존 입력 필드 */}
      <div className="flex w-full items-center justify-center">
        <Input
          placeholder={
            isProcessing ? "이미지 처리 중..." : "포켓몬 이름으로 검색"
          }
          value={inputValue}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedImage(URL.createObjectURL(file));
          }}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary ml-2"
          disabled={isProcessing}
        >
          📷
        </button>
      </div>
    </div>
  );
}

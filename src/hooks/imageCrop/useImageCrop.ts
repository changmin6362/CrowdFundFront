import { useState, useCallback } from "react";
import { type Crop } from "react-image-crop";

interface CropRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ImageSize {
  naturalWidth: number;
  naturalHeight: number;
}

export default function useImageCrop() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [imageSize, setImageSize] = useState<ImageSize>({
    naturalWidth: 0,
    naturalHeight: 0,
  });

  // 이미지 선택 핸들러
  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
  }, []);

  // 이미지 로드 핸들러
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    setImageSize({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    });
  }, []);

  // 크롭 영역 변경 핸들러
  const handleCropChange = useCallback((newCrop: Crop) => {
    setCrop(newCrop);
  }, []);

  // 크롭 영역을 실제 픽셀 좌표로 변환
  const calculateCropRect = useCallback(
    (currentCrop: Crop): CropRect => {
      if (!imageSize.naturalWidth || !imageSize.naturalHeight) {
        return { left: 0, top: 0, width: 0, height: 0 };
      }

      return {
        left: Math.round((currentCrop.x * imageSize.naturalWidth) / 100),
        top: Math.round((currentCrop.y * imageSize.naturalHeight) / 100),
        width: Math.round((currentCrop.width * imageSize.naturalWidth) / 100),
        height: Math.round(
          (currentCrop.height * imageSize.naturalHeight) / 100,
        ),
      };
    },
    [imageSize],
  );

  return {
    selectedImage,
    crop,
    setCrop: handleCropChange,
    handleImageSelect,
    handleImageLoad,
    handleCropCancel: useCallback(() => {
      setSelectedImage(null);
      setCrop({
        unit: "%",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      });
    }, []),
    calculateCropRect,
  };
}

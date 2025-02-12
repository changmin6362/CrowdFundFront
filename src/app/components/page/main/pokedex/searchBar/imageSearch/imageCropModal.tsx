import { useState, useEffect } from "react";
import Image from "next/image";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import RootModal from "@/app/components/ui/modal/rootModal";
import CropControls from "./cropControls";
import calculateCropRect from "@/utils/etc/calculateCropRect";

import useImageZoom from "@/hooks/image/useImageZoom";

import { useModalContext } from "@/app/contexts/modalContext";

interface CropRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ImageCropModalProps {
  imageSrc: string;
  onConfirm: (cropRect: CropRect) => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

export default function ImageCropModal({
  imageSrc,
  onConfirm,
  onCancel,
  isProcessing,
}: ImageCropModalProps) {
  const { setModalOpen } = useModalContext();

  useEffect(() => {
    setModalOpen(true);
    return () => setModalOpen(false);
  }, [setModalOpen]);

  // 크롭 영역 상태 관리 (퍼센트 단위)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  // 원본 이미지 상태
  const [imageSize, setImageSize] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
  });

  // useImageZoom 훅
  const { scale, zoomIn, zoomOut } = useImageZoom({
    initialScale: 1,
    minScale: 1,
    maxScale: 5,
    scaleStep: 0.4,
  });

  // 이미지 원본 크기 상태 관리
  const handleImageLoad = (img: HTMLImageElement) => {
    setImageSize({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    });

    // 초기 크롭 영역 리셋
    setCrop({
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  };

  // 크롭 확정 처리
  const handleConfirm = async () => {
    const cropRect = calculateCropRect(crop as PixelCrop, {
      width: imageSize.naturalWidth,
      height: imageSize.naturalHeight,
    });
    await onConfirm(cropRect);
  };

  return (
    <RootModal>
      {/* 이미지 크롭 영역 */}
      <ReactCrop crop={crop} onChange={setCrop} aspect={undefined}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center",
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src={imageSrc}
            alt="Crop preview"
            width={1200}
            height={800}
            style={{ objectFit: "contain" }}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              handleImageLoad(img);
            }}
            unoptimized // 외부 이미지 최적화 비활성화
          />
        </div>
      </ReactCrop>

      {/* 동작 버튼 영역 */}
      <CropControls
        onConfirm={handleConfirm}
        onCancel={onCancel}
        isProcessing={isProcessing}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
    </RootModal>
  );
}

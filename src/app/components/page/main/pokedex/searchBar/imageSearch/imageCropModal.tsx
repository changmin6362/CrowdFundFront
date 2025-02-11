import { useState } from "react";
import Image from "next/image";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import Portal from "@/app/components/ui/portal";
import ModalControls from "./modalControls";
import calculateCropRect from "@/utils/etc/calculateCropRect";
import "react-image-crop/dist/ReactCrop.css";

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
  // 크롭 영역 상태 관리 (퍼센트 단위)
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
    <Portal>
      {/* 모달 오버레이 */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        {/* 모달 컨텐츠 영역 */}
        <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4">
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            aspect={undefined}
            keepSelection
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
          </ReactCrop>

          <ModalControls
            onConfirm={handleConfirm}
            onCancel={onCancel}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </Portal>
  );
}

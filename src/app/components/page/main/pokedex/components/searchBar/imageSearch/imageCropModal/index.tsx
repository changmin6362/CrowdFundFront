import { useEffect, useCallback } from "react";
import Image from "next/image";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import RootModal from "@/app/components/ui/modal/rootModal";
import useImageZoom from "@/hooks/image/useImageZoom";
import { useModalContext } from "@/app/contexts/modalContext";

import CropControls from "./cropControls";

interface ImageCropModalProps {
  imageSrc: string;
  crop: Crop;
  onCropChange: (crop: Crop) => void;
  onImageLoad: (img: HTMLImageElement) => void;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isProcessing: boolean;
}

export default function ImageCropModal({
  imageSrc,
  crop,
  onCropChange,
  onImageLoad,
  onConfirm,
  onCancel,
  isProcessing,
}: ImageCropModalProps) {
  // 모달 상태를 관리하는 컨텍스트
  const { setModalOpen } = useModalContext();
  // 이미지 줌 기능을 위한 커스텀 훅
  const { scale, zoomIn, zoomOut } = useImageZoom({
    initialScale: 1,
    minScale: 1,
    maxScale: 5,
    scaleStep: 0.4,
  });

  // 컴포넌트가 마운트될 때 모달을 열고, 언마운트될 때 모달을 닫음
  useEffect(() => {
    setModalOpen(true);
    return () => setModalOpen(false);
  }, [setModalOpen]);

  // 크롭 영역이 변경될 때마다 호출되는 핸들러
  const handleCropChange = useCallback(
    (_: Crop, percentCrop: Crop) => {
      onCropChange(percentCrop);
    },
    [onCropChange],
  );

  return (
    <RootModal>
      <ReactCrop
        crop={crop}
        onChange={handleCropChange}
        aspect={undefined}
        minWidth={50}
        minHeight={50}
        ruleOfThirds
      >
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
            onLoad={(e) => onImageLoad(e.target as HTMLImageElement)}
            unoptimized
          />
        </div>
      </ReactCrop>

      <CropControls
        onConfirm={onConfirm}
        onCancel={onCancel}
        isProcessing={isProcessing}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
    </RootModal>
  );
}

import { Crop } from "react-image-crop";

// 크롭 영역을 실제 이미지 픽셀 좌표로 변환하는 함수
export default function calculateCropRect(
  crop: Crop,
  naturalSize: { width: number; height: number },
) {
  const { unit, x, y, width, height } = crop;

  // 퍼센트 단위 계산
  if (unit === "%") {
    return {
      left: Math.round((x / 100) * naturalSize.width),
      top: Math.round((y / 100) * naturalSize.height),
      width: Math.round((width / 100) * naturalSize.width),
      height: Math.round((height / 100) * naturalSize.height),
    };
  }

  // 픽셀 단위 계산 (기본값)
  return {
    left: Math.round(x),
    top: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

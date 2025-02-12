import { useState } from "react";

interface UseImageZoomOptions {
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  scaleStep?: number;
}

export default function useImageZoom({
  initialScale = 1,
  minScale = 1,
  maxScale = 5,
  scaleStep = 0.4,
}: UseImageZoomOptions) {
  const [scale, setScale] = useState(initialScale);

  const zoomIn = () => setScale((prev) => Math.min(prev + scaleStep, maxScale));
  const zoomOut = () =>
    setScale((prev) => Math.max(prev - scaleStep, minScale));
  const resetZoom = () => setScale(initialScale);

  return { scale, zoomIn, zoomOut, resetZoom };
}

import { useState } from "react";
import { createWorker } from "tesseract.js";

export default function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (
    file: File,
    rectangle?: { left: number; top: number; width: number; height: number },
  ): Promise<string> => {
    setIsProcessing(true);
    try {
      // tesseract.js가 인식할 언어 설정
      const worker = await createWorker("kor+eng+jpn");

      // 이미지 영역 설정
      if (rectangle) {
        await worker.recognize(file, {
          rectangle,
        });
      }
      // 지정 영역에서 OCR 수행
      const {
        data: { text },
      } = await worker.recognize(file);
      // 리소스 정리
      await worker.terminate();
      return text.trim();
    } catch (error) {
      console.error("OCR Error:", error);
      return "";
    } finally {
      setIsProcessing(false);
    }
  };

  return { processImage, isProcessing };
}

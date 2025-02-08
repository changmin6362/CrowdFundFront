import { useState } from "react";
import { createWorker } from "tesseract.js";

export default function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (file: File): Promise<string> => {
    setIsProcessing(true);
    try {
      const worker = await createWorker("kor+eng");
      const {
        data: { text },
      } = await worker.recognize(file);
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

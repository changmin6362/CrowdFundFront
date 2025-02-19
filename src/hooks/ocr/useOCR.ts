import { useState } from "react";
import { createWorker, PSM, OEM } from "tesseract.js";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

interface CropArea {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function useOCR() {
  const { showError } = useErrorModalContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (
    file: File,
    cropArea?: CropArea,
  ): Promise<string> => {
    setIsProcessing(true);
    let worker;
    try {
      // OEM: OCR Engine Mode, 최신 딥러닝 기반 OCR 엔진 사용
      // corePath: WebAssembly 파일 경로; 클라이언트 사이드에서 이미지 처리를 하게 해줌
      // langPath: 언어 인식을 위한 학습 데이터 파일 경로; 다국어 지원을 해줌
      worker = await createWorker(["kor", "eng", "jpn"], OEM.LSTM_ONLY, {
        corePath:
          "https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js",
        langPath: "https://tessdata.projectnaptha.com/4.0.0",
      });

      // PSM: Page Segmentation Mode, 단일 텍스트 블록; 한글 인식에 최적화
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });

      const {
        data: { text },
      } = await worker.recognize(file, { rectangle: cropArea });

      return text.trim();
    } catch (error) {
      showError(
        `OCR Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      return "";
    } finally {
      if (worker) await worker.terminate();
      setIsProcessing(false);
    }
  };

  return { processImage, isProcessing };
}

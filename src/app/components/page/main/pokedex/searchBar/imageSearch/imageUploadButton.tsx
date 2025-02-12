import { useRef } from "react";

export default function ImageUploadButton({
  onSelect,
  isProcessing,
}: {
  onSelect: (file: File) => void;
  isProcessing: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelect(file);
      // 파일 선택 후 입력값을 초기화
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn-primary ml-2"
        disabled={isProcessing}
      >
        {isProcessing ? "처리 중..." : "📷"}
      </button>
    </>
  );
}

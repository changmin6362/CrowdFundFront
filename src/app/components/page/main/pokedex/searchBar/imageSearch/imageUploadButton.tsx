import { useRef } from "react";

export default function ImageUploadButton({
  onSelect,
  isProcessing,
}: {
  onSelect: (file: File) => void;
  isProcessing: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onSelect(e.target.files[0])}
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

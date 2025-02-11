interface ModalControlsProps {
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export default function ModalControls({
  onConfirm,
  onCancel,
  isProcessing,
}: ModalControlsProps) {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button onClick={onCancel} className="btn-secondary">
        닫기
      </button>
      <button
        onClick={onConfirm}
        disabled={isProcessing}
        className="btn-primary"
      >
        {isProcessing ? "인식 중..." : "OCR 실행"}
      </button>
    </div>
  );
}

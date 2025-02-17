interface CropControlsProps {
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function CropControls({
  onConfirm,
  onCancel,
  isProcessing,
  onZoomIn,
  onZoomOut,
}: CropControlsProps) {
  return (
    <div className="modal-button">
      {/* 확대/축소 버튼 */}
      <button onClick={onZoomOut} className="btn-secondary">
        −
      </button>
      <button onClick={onZoomIn} className="btn-secondary">
        +
      </button>
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

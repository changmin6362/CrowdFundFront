import React from "react";
import Portal from "@/components/ui/portal";

interface ErrorModalProps {
  errorMessage: string;
  error?: unknown;
  onClose: () => void;
}

export default function ErrorModal({
  errorMessage,
  error,
  onClose,
}: ErrorModalProps) {
  return (
    <Portal>
      <div className="overlay-blur">
        <div className="error-modal">
          <h2 className="error-message">에러 발생</h2>
          <p className="mt-2">{errorMessage}</p>
          {error != null && (
            <pre className="mt-2 overflow-auto text-xs text-gray-700">
              {typeof error === "object"
                ? JSON.stringify(error, null, 2)
                : String(error)}
            </pre>
          )}
          <div className="modal-button">
            <button
              className="btn-secondary remove-outline"
              onClick={onClose}
              autoFocus
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

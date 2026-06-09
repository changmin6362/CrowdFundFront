import { createContext, useContext, useState, ReactNode } from "react";
import ErrorModal from "@components/ui/modal/errorModal";

interface ErrorModalContextType {
  errorMessage: string | null;
  error?: unknown;
  showError: (message: string, error?: unknown) => void;
  hideError: () => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined,
);

export function ErrorModalProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);

  const showError = (message: string, err?: unknown) => {
    setErrorMessage(message);
    setError(err);
  };

  const hideError = () => {
    setErrorMessage(null);
    setError(null);
  };

  return (
    <ErrorModalContext.Provider
      value={{ errorMessage, error, showError, hideError }}
    >
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          error={error}
          onClose={hideError}
        />
      )}
      {children}
    </ErrorModalContext.Provider>
  );
}

export function useErrorModalContext() {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error(
      "useErrorModalContext를 사용하려면 ErrorModalProvider로 감싸야 합니다.",
    );
  }
  return context;
}

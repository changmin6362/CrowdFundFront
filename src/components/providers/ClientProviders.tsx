"use client";

import { ModalProvider } from "@contexts/modalContext";
import { ErrorModalProvider } from "@contexts/errorModalContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ErrorModalProvider>
        {children}
      </ErrorModalProvider>
    </ModalProvider>
  );
}

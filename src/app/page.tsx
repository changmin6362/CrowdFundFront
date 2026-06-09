"use client";

import { ModalProvider } from "@contexts/modalContext";
import { ErrorModalProvider } from "@contexts/errorModalContext";
import AuthTestPage from "@/app/auth-test/page";

export default function Home() {
  return (
      <ModalProvider>
        <ErrorModalProvider>
          <AuthTestPage />
        </ErrorModalProvider>
      </ModalProvider>
  );
}

"use client";

import { ModalProvider } from "./contexts/modalContext";
import { ErrorModalProvider } from "./contexts/errorModalContext";

export default function Home() {
  return (
      <ModalProvider>
        <ErrorModalProvider>
          <></>
        </ErrorModalProvider>
      </ModalProvider>
  );
}

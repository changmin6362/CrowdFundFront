"use client";

import MainPage from "@/app/components/page/main/pokedex";
import { PokemonProvider } from "@/app/contexts/selectedPokemonContext";
import { ModalProvider } from "./contexts/modalContext";
import { ErrorModalProvider } from "./contexts/errorModalContext";

export default function Home() {
  return (
    <PokemonProvider>
      <ModalProvider>
        <ErrorModalProvider>
          <MainPage />
        </ErrorModalProvider>
      </ModalProvider>
    </PokemonProvider>
  );
}

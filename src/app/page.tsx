"use client";

import MainPage from "@/app/components/page/main/";
import { PokemonProvider } from "@/app/contexts/selectedPokemonContext";
import { ModalProvider } from "./contexts/modalContext";

export default function Home() {
  return (
    <PokemonProvider>
      <ModalProvider>
        <MainPage />
      </ModalProvider>
    </PokemonProvider>
  );
}

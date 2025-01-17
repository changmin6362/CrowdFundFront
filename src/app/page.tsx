"use client";

import MainPage from "@/app/components/page/main/";
import { ContextProvider } from "@/app/contexts/PokemonContext";

export default function Home() {
  return (
    <ContextProvider>
      <MainPage />
    </ContextProvider>
  );
}

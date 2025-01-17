"use client";

import MainPage from "@/app/components/page/main/";
import { ContextProvider } from "@/app/contexts/PokemonContext";

import { usePokemonContext } from "@/app/contexts/PokemonContext";
import PokemonImage from "@/app/components/ui/PokemonImage";
import PokemonSiluette from "@/app/assets/svg/PokemonSilhouette.svg";

// 페이지의 헤더 부분
function Header() {
  const { selectedPokemon } = usePokemonContext();

  const artwork =
    selectedPokemon?.sprites.other["official-artwork"].front_default ?? null;

  return (
    <header className="flex flex-col items-center justify-center pt-8">
      <h1>PokeDex</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="box-rounded bg-striped mb-6">
          <PokemonImage
            imageUrl={artwork ?? PokemonSiluette}
            imageAlt={"Pokemon official artwork"}
            size={{ width: 208, height: 208 }}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <ContextProvider>
      <Header />
      <MainPage />
    </ContextProvider>
  );
}

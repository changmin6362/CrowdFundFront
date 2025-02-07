import { usePokemonContext } from "@/app/contexts/PokemonContext";

import PreviewContainer from "@/app/components/ui/previewContainer";
import SwipeContainer from "@/app/components/layout/SwipeContainer";
import Pokedex from "@/app/components/page/main/pokedex/";
import PokemonTypeDisplay from "@/app/components/page/main/PokemonInfoDisplay/";

export default function MainPage() {
  // 전역 상태에서 현재 선택된 포켓몬과 업데이트 함수를 가져옴
  const { selectedPokemon } = usePokemonContext();
  return (
    <div className="px-8 pt-4">
      <PreviewContainer />
      <SwipeContainer>
        <Pokedex />
        <PokemonTypeDisplay selectedPokemon={selectedPokemon} />
      </SwipeContainer>
    </div>
  );
}

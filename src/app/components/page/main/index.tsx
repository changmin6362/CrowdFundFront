import PreviewContainer from "@/app/components/ui/previewContainer";
import PokemonTypeDisplay from "@/app/components/page/main/infoList/PokemonTypeDisplay";
import SwipeContainer from "@/app/components/layout/SwipeContainer";
import Pokedex from "@/app/components/page/main/pokedex/";

export default function MainPage() {
  return (
    <>
      <PreviewContainer />
      <SwipeContainer>
        <Pokedex />
        <PokemonTypeDisplay />
      </SwipeContainer>
    </>
  );
}

import Header from "@/app/components/page/main/pokedex/header/";
import PokemonTypeDisplay from "@/app/components/page/main/infoList/PokemonTypeDisplay";
import SwipeContainer from "@/app/components/layout/SwipeContainer";
import Pokedex from "@/app/components/page/main/pokedex/";

export default function MainPage() {
  return (
    <>
      <Header />
      <SwipeContainer>
        <Pokedex />
        <PokemonTypeDisplay />
      </SwipeContainer>
    </>
  );
}

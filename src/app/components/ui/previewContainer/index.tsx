import PokemonImage from "@/app/components/ui/pokemonImage/";
import SkeletonPokemonImage from "@/app/components/ui/pokemonImage/skeleton";
import PokemonSiluette from "@/app/assets/svg/PokemonSilhouette.svg";
import { usePokemonContext } from "@/app/contexts/selectedPokemonContext";

import { POKEMON_IMAGE } from "@/constants/pokedexList";

// 내가 선택한 아이템의 이미지를 보여주는 부분
export default function PreviewContainer() {
  const { selectedPokemon } = usePokemonContext();

  const artwork = selectedPokemon
    ? POKEMON_IMAGE.OFFICIAL_ARTWORK(selectedPokemon)
    : null;

  return (
    <header className="flex flex-col items-center justify-center">
      <h1>PokeDex</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="box-rounded bg-striped mb-6">
          {artwork !== null ? (
            <PokemonImage
              imageUrl={artwork}
              imageAlt={"Pokemon official artwork"}
              size={{ width: 208, height: 208 }}
            />
          ) : (
            <SkeletonPokemonImage
              imageUrl={PokemonSiluette}
              size={{ width: 208, height: 208 }}
            />
          )}
        </div>
      </div>
    </header>
  );
}

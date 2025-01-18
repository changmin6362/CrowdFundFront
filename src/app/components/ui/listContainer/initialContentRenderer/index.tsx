import getItemText from "@/utils/pokemon/getItemText";
import ListItemCard from "@/app/components/ui/listItemCard";

import { POKEMON_IMAGE } from "@/constants/pokedexList";

interface InitialContentRendererProps {
  displayList: Pokemon[];
  registerPokemonRef: (item: Pokemon) => (element: HTMLElement | null) => void;
}

// 리스트 아이템의 초기 렌더링을 수행하는 컴포넌트
export default function InitialContentRenderer({
  displayList,
  registerPokemonRef,
}: InitialContentRendererProps) {
  return (
    <>
      {displayList.map((pokemon) => (
        <ListItemCard
          key={`pokemon-${pokemon.id}`}
          imageUrl={POKEMON_IMAGE.OFFICIAL_ARTWORK(pokemon)}
          imageAlt={pokemon.name}
          infoText={getItemText(pokemon)}
          registerPokemonRef={registerPokemonRef(pokemon)}
        />
      ))}
    </>
  );
}

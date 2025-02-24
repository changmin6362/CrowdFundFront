import { useState } from "react";

import PokemonNameData from "@/app/assets/mockData/PokemonNameData.json";

export default function useAutoComplete() {
  const [autoCompleteItems, setAutoCompleteItems] = useState<string[]>([]);

  const getMatchingNames = (value: string): string[] => {
    const trimmedValue = value.trim().toLowerCase();
    if (!trimmedValue) return [];

    // 한글, 영어, 일본어 이름으로 포켓몬 검색
    return (
      PokemonNameData.filter((pokemon) => {
        const koMatch = pokemon.ko_name.toLowerCase().includes(trimmedValue);
        const enMatch = pokemon.en_name.toLowerCase().includes(trimmedValue);
        const jpMatch = pokemon.jp_name.toLowerCase().includes(trimmedValue);

        return koMatch || enMatch || jpMatch;
      })
        .map((pokemon) => {
          // 일치하는 언어만 반환
          if (pokemon.ko_name.toLowerCase().includes(trimmedValue)) {
            return pokemon.ko_name;
          }
          if (pokemon.en_name.toLowerCase().includes(trimmedValue)) {
            return pokemon.en_name;
          }
          if (pokemon.jp_name.toLowerCase().includes(trimmedValue)) {
            return pokemon.jp_name;
          }
          return null;
        })
        // 빈 값을 제외한 배열만 반환
        .filter((name) => name !== null)
    );
  };

  const updateAutoCompleteList = (newValue: string) => {
    const matchedPokemons = getMatchingNames(newValue);
    setAutoCompleteItems(matchedPokemons);
  };

  const clearAutoCompleteList = () => {
    setAutoCompleteItems([]);
  };

  return { autoCompleteItems, updateAutoCompleteList, clearAutoCompleteList };
}

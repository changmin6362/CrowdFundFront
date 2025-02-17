import { useState } from "react";

import { useErrorModalContext } from "@/app/contexts/errorModalContext";
import searchPokemon from "@/utils/pokemon/searchPokemon";
import useGetSearchItems from "@/api/pokemon/useGetSearchItems";
import useGetPreviousSearchItems from "@/api/pokemon/useGetPreviousSearchItems";

interface SearchPokemonParams {
  defaultItems: Pokemon[];
  scrollToElement: (pokemonId: number) => void;
  resetRefs: () => void;
}

export default function useSearchPokemon({
  defaultItems,
  scrollToElement,
  resetRefs,
}: SearchPokemonParams) {
  const { showError } = useErrorModalContext();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  // 검색 리스트의 데이터 호출을 위한 커스텀 훅
  const {
    searchItems,
    hasNextItems,
    appendNextSearchItems,
    createsearchItemsByPokemonId,
    clearSearch,
  } = useGetSearchItems();

  const {
    searchItemGroups,
    hasPreviousItems,
    appendPreviousSearchItems,
    initializeGroups,
  } = useGetPreviousSearchItems({ initialSearchItems: searchItems });

  // 검색된 포켓몬으로 이동하는 함수
  const handleSearchNavigation = async (pokemonId: number) => {
    try {
      // 검색한 아이템이 defaultItems에 있는지 확인
      const existingInDefault = defaultItems.some(
        (pokemon) => pokemon.id === pokemonId,
      );
      // 검색한 아이템이 searchItems에 있는지 확인
      const existingSearch = searchItems.some(
        (pokemon) => pokemon.id === pokemonId,
      );

      // 검색한 아이템이 existingInGroups에 있는지 확인
      const existingInGroups = searchItemGroups.some((group) =>
        group.some((pokemon) => pokemon.id === pokemonId),
      );

      // 검색한 아이템이 defaultItems에 있는 경우 searchItems 초기화
      if (existingInDefault) {
        clearSearch();
        resetRefs();
        scrollToElement(pokemonId);
        // searchItems 있다면 해당 위치로 스크롤
      } else if (existingSearch || existingInGroups) {
        scrollToElement(pokemonId);
      } else {
        setIsLoadingSearch(true);
        // 새로운 데이터를 호출하기 전에 이전에 불러온 데이터를 지움
        clearSearch();
        resetRefs();
        // 두 리스트에 모두 없는 경우 검색한 아이템이 포함된 새로운 searchItems 생성
        await createsearchItemsByPokemonId(pokemonId);
        initializeGroups(searchItems);
        // DOM 업데이트 이후 검색한 아이템의 위치로 이동
        scrollToElement(pokemonId);
        // 검색한 아이템까지 이동한 뒤에 상태값 변경
        setTimeout(() => setIsLoadingSearch(false), 1000);
      }
    } catch (error) {
      setIsLoadingSearch(false);
      showError("포켓몬 검색에 실패했습니다.:", error);
    }
  };

  // 입력된 이름으로 포켓몬을 검색하는 함수
  const handleSearch = (value: string) => {
    // 빈 문자열이면 searchItems를 제거하고 defaultItems의 첫 번째 포켓몬으로 스크롤
    if (value === "") {
      clearSearch();
      scrollToElement(1);
      return;
    }
    const foundPokemon = searchPokemon(value);

    if (foundPokemon) {
      handleSearchNavigation(foundPokemon.id);
    } else {
      showError(`${value}와 일치하는 이름이 없습니다.`);
    }
  };

  return {
    searchItems,
    hasNextItemsSearch: hasNextItems,
    appendNextSearchItems,
    handleSearch,
    isLoadingSearch,
    searchItemGroups,
    hasPreviousItems,
    appendPreviousSearchItems,
  };
}

import { useState, useMemo, useCallback } from "react";

import { useErrorModalContext } from "@/app/contexts/errorModalContext";
import searchPokemon from "@/utils/pokemon/searchPokemon";

import useDefaultData from "./useData/useDefaultData";
import useSearchData from "./useData/useSearchData";
import useItemPresence from "./validation/useItemPresence";

interface usePokemonIdSearchProps {
  scrollToElement: (pokemonId: number) => void;
}

export default function usePokemonIdSearch({
  scrollToElement,
}: usePokemonIdSearchProps) {
  const { showError } = useErrorModalContext();
  const [isLoading, setIsLoading] = useState(false);

  // 기본 데이터 및 액션
  const { defaultData, defaultActions } = useDefaultData();

  // 검색 데이터 및 액션
  const { searchData, searchActions } = useSearchData();

  // 아이템 존재 여부 확인
  const { checkItemPresence } = useItemPresence(
    defaultData.items,
    searchData.items,
    searchData.groups,
  );

  // 검색 모드 여부를 나타내는 파생 상태
  const isSearchMode = useMemo(
    () => searchData.items.length > 0,
    [searchData.items],
  );

  // 기본 리스트에 있는 아이템으로 이동하는 핸들러
  const handleDefaultNavigation = useCallback(
    (pokemonId: number) => {
      if (isSearchMode) {
        searchActions.clearItems();
      }
      scrollToElement(pokemonId);
    },
    [isSearchMode, searchActions, scrollToElement],
  );

  // 검색 리스트에 있는 아이템으로 이동하는 핸들러
  const handleSearchNavigation = useCallback(
    async (pokemonId: number) => {
      searchActions.clearItems();
      await searchActions.fetchByPokemonId(pokemonId);
      searchActions.initializeGroups(searchData.items);
      scrollToElement(pokemonId);
    },
    [searchActions, searchData.items, scrollToElement],
  );

  // 검색 네비게이션 핸들러
  const handleNavigation = useCallback(
    async (pokemonId: number) => {
      try {
        setIsLoading(true);
        const { inDefault, inSearch, inGroups } = checkItemPresence(pokemonId);

        if (inDefault) {
          handleDefaultNavigation(pokemonId);
        } else if (inSearch || inGroups) {
          scrollToElement(pokemonId);
        } else {
          await handleSearchNavigation(pokemonId);
        }

        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        showError("검색에 실패했습니다", error);
        setIsLoading(false);
      }
    },
    [
      checkItemPresence,
      handleDefaultNavigation,
      handleSearchNavigation,
      scrollToElement,
      showError,
    ],
  );

  // 입력된 포켓몬 이름으로 검색을 수행하는 핸들러
  const handleSearch = (value: string) => {
    if (value === "") {
      searchActions.clearItems();
      scrollToElement(1);
      return;
    }

    const foundPokemon = searchPokemon(value);
    if (foundPokemon) {
      handleNavigation(foundPokemon.id);
    } else {
      showError(`${value}와 일치하는 이름이 없습니다.`);
    }
  };

  return {
    defaultData,
    defaultActions,
    searchData,
    searchActions,
    isLoading,
    isSearchMode,
    handleSearch,
  };
}

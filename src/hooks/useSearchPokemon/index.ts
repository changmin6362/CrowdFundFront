import { useState } from "react";

import searchPokemon from "@/utils/pokemon/searchPokemon";
import useDefaultData from "./useData/useDefaultData";
import useSearchData from "./useData/useSearchData";
import useScrollManager from "./useScrollManager/";
import useItemPresence from "./validation/useItemPresence";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

interface SearchPokemonProps {
  scrollToElement: (pokemonId: number) => void;
  resetRefs: () => void;
}

export default function useSearchPokemon({
  scrollToElement,
  resetRefs,
}: SearchPokemonProps) {
  const { showError } = useErrorModalContext();
  const [isLoading, setIsLoading] = useState(false);

  // 기본 데이터 및 액션
  const { defaultData, defaultActions } = useDefaultData();

  // 검색 데이터 및 액션
  const { searchData, dataActions } = useSearchData(defaultData.items);

  // 스크롤 관리
  const { navigateToItem, smartScroll } = useScrollManager({
    scrollToElement,
    resetRefs,
  });

  // 아이템 존재 여부 확인
  const { checkItemExistence } = useItemPresence(
    defaultData.items,
    searchData.items,
    searchData.groups,
  );

  // 검색 네비게이션 핸들러
  const handleSearchNavigation = async (pokemonId: number) => {
    try {
      setIsLoading(true);
      // 모든 캐시 초기화
      dataActions.clearSearch();
      resetRefs();
      const { inDefault, inSearch, inGroups } = checkItemExistence(pokemonId);

      if (inDefault) {
        dataActions.clearSearch();
        navigateToItem(pokemonId);
      } else if (inSearch || inGroups) {
        smartScroll(pokemonId);
      } else {
        await dataActions.createNewSet(pokemonId);
        dataActions.initGroups([]);
        smartScroll(pokemonId);
      }
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      showError("검색에 실패했습니다", error);
      setIsLoading(false);
    }
  };

  // 검색 입력 핸들러
  const handleSearch = (value: string) => {
    if (value === "") {
      dataActions.clearSearch();
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
    searchState: {
      ...defaultData,
      ...searchData,
      isLoading,
      defaultItems: defaultData.items,
    },
    searchActions: {
      handleSearch,
      handleNavigation: handleSearchNavigation,
      defaultAppendNext: defaultActions.appendNext,
      appendPrevious: dataActions.appendPrevious,
      appendNext: dataActions.appendNext,
    },
  };
}

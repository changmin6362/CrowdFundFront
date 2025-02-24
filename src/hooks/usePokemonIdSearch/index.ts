import { useState } from "react";

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

  // 검색 네비게이션 핸들러
  const handleNavigation = async (pokemonId: number) => {
    try {
      setIsLoading(true);
      const { inDefault, inSearch, inGroups } = checkItemPresence(pokemonId);

      if (inDefault) {
        // 기본 리스트에 있는 경우 -> 해당 포켓몬으로 바로 스크롤
        scrollToElement(pokemonId);
      } else if (inSearch || inGroups) {
        // 검색 결과나 이전 검색 그룹에 있는 경우 -> 현재 검색 상태를 유지한 채로 스크롤
        scrollToElement(pokemonId);
      } else {
        // 어디에도 없는 경우 -> 기존 검색 결과 초기화
        searchActions.clearItems();
        // 새로운 검색 결과 세트 생성
        await searchActions.fetchByPokemonId(pokemonId);
        // 검색 그룹 초기화
        searchActions.initializeGroups(searchData.items);
        // 검색된 포켓몬으로 스크롤
        scrollToElement(pokemonId);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      showError("검색에 실패했습니다", error);
      setIsLoading(false);
    }
  };

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
    handleSearch,
  };
}

import { useState } from "react";

import searchPokemon from "@/utils/pokemon/searchPokemon";
import useDefaultData from "./useData/useDefaultData";
import useSearchData from "./useData/useSearchData";
import useItemPresence from "./validation/useItemPresence";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

interface SearchPokemonProps {
  scrollToElement: (pokemonId: number) => void;
}

export default function useSearchPokemon({
  scrollToElement,
}: SearchPokemonProps) {
  const { showError } = useErrorModalContext();
  const [isLoading, setIsLoading] = useState(false);

  // 기본 데이터 및 액션
  const { defaultData, defaultActions } = useDefaultData();

  // 검색 데이터 및 액션
  const { searchData, dataActions } = useSearchData();

  // 아이템 존재 여부 확인
  const { checkItemExistence } = useItemPresence(
    defaultData.items,
    searchData.items,
    searchData.groups,
  );

  // 검색 네비게이션 핸들러
  const handleNavigation = async (pokemonId: number) => {
    try {
      setIsLoading(true);
      const { inDefault, inSearch, inGroups } = checkItemExistence(pokemonId);

      if (inDefault) {
        // 기본 리스트에 있는 경우 -> 해당 포켓몬으로 바로 스크롤
        scrollToElement(pokemonId);
      } else if (inSearch || inGroups) {
        // 검색 결과나 이전 검색 그룹에 있는 경우 -> 현재 검색 상태를 유지한 채로 스크롤
        scrollToElement(pokemonId);
      } else {
        // 어디에도 없는 경우 -> 기존 검색 결과 초기화
        dataActions.clearItems();
        // 새로운 검색 결과 세트 생성
        await dataActions.fetchByPokemonId(pokemonId);
        // 검색 그룹 초기화
        dataActions.initializeGroups(searchData.items);
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

  // 검색 입력 핸들러
  const handleSearch = (value: string) => {
    if (value === "") {
      dataActions.clearItems();
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
    dataActions,
    isLoading,
    handleSearch,
  };
}

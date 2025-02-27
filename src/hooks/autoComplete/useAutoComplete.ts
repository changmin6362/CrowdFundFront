import { useState } from "react";

import PokemonNameData from "@/app/assets/mockData/PokemonNameData.json";

import { MAX_AUTO_COMPLETE_ITEMS } from "@/constants/pokedexList";

export default function useAutoComplete() {
  // 자동완성 추천 목록
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);
  // 현재 선택된 항목의 인덱스
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // 자동완성 목록 표시 여부 상태
  const [isOpen, setIsOpen] = useState(false);

  // 언어별 이름 매칭 검사
  const matchLanguageName = (pokemon: PokemonName, value: string) => {
    const lowerValue = value.toLowerCase();
    return (
      pokemon.ko_name.toLowerCase().includes(lowerValue) ||
      pokemon.en_name.toLowerCase().includes(lowerValue) ||
      pokemon.jp_name.toLowerCase().includes(lowerValue)
    );
  };

  // 일치하는 언어의 이름 추출
  const extractMatchedName = (pokemon: PokemonName, value: string) => {
    const lowerValue = value.toLowerCase();
    if (pokemon.ko_name.toLowerCase().includes(lowerValue))
      return pokemon.ko_name;
    if (pokemon.en_name.toLowerCase().includes(lowerValue))
      return pokemon.en_name;
    if (pokemon.jp_name.toLowerCase().includes(lowerValue))
      return pokemon.jp_name;
    return null;
  };

  // 자동완성 목록 업데이트
  const updateAutoCompleteList = (inputValue: string) => {
    const trimmedValue = inputValue.trim();

    // 입력값이 없으면 목록 초기화
    if (!trimmedValue) {
      setAutoCompleteList([]);
      setIsOpen(false);
      return;
    }

    // 추천 목록 생성
    const matchedList = PokemonNameData.filter((pokemon) =>
      matchLanguageName(pokemon, trimmedValue),
    )

      .map((pokemon) => extractMatchedName(pokemon, trimmedValue))
      // null 값 제거
      .filter((name): name is string => name !== null)
      // 상수로 개수 제한
      .slice(0, MAX_AUTO_COMPLETE_ITEMS);

    setAutoCompleteList(matchedList);
    setIsOpen(matchedList.length > 0);
  };

  // 자동완성 목록 초기화
  const clearAutoCompleteList = () => {
    setAutoCompleteList([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return {
    autoCompleteList,
    updateAutoCompleteList,
    selectedIndex,
    setSelectedIndex,
    isOpen,
    clearAutoCompleteList,
  };
}

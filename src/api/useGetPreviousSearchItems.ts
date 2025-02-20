import { useState, useCallback, useEffect } from "react";
import { BATCH_SIZE } from "@/constants/pokedexList";
import FetchPokemonList from "@/api/pokemon/fetchPokemonList";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

interface UseGetPreviousSearchItemsProps {
  searchItems: Pokemon[];
}

export default function useGetPreviousSearchItems({
  searchItems,
}: UseGetPreviousSearchItemsProps) {
  const [searchItemGroups, setSearchItemGroups] = useState<Pokemon[][]>([]);
  const [hasPreviousItems, setHasPreviousItems] = useState(true);
  const { showError } = useErrorModalContext();

  // 초기값 설정 함수
  const initializeSearchGroups = useCallback((items: Pokemon[]) => {
    if (items.length > 0) {
      setSearchItemGroups([items]);
      setHasPreviousItems(items[0].id > 1);
    } else {
      setSearchItemGroups([]);
      setHasPreviousItems(true);
    }
  }, []);

  // 이전 데이터 로드
  const fetchPreviousSearchItems = useCallback(async () => {
    // 첫 번째 요청일 때는 initialSearchItems 기준,
    // 그 이후부터는 searchItemGroups의 마지막 그룹 기준
    const targetList =
      searchItemGroups.length === 0
        ? searchItems
        : searchItemGroups[searchItemGroups.length - 1];

    if (!targetList.length) return;

    try {
      const startOffset = targetList[0].id - BATCH_SIZE;
      const fetchedList = await FetchPokemonList({
        startOffset,
        batchSize: BATCH_SIZE,
      });

      if (fetchedList) {
        setSearchItemGroups((prev) => [...prev, fetchedList]);
        setHasPreviousItems(startOffset > 0);
      }
    } catch (error) {
      showError("이전 데이터를 가져오는데 실패했습니다:", error);
    }
  }, [searchItemGroups, searchItems, showError]);

  // 초기 마운트 시에만 실행
  useEffect(() => {
    initializeSearchGroups(searchItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 상태 초기화 함수 추가
  const resetSearchGroups = useCallback(() => {
    setSearchItemGroups([]);
    setHasPreviousItems(true);
  }, []);

  return {
    searchItemGroups,
    hasPreviousItems,
    fetchPreviousSearchItems,
    initializeSearchGroups,
    resetSearchGroups,
  };
}

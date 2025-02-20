import { useState, useCallback, useEffect } from "react";
import { BATCH_SIZE } from "@/constants/pokedexList";
import FetchPokemonList from "@/api/pokemon/fetchPokemonList";
import updatePokemonList from "@/utils/pokemon/updatePokemonList";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

/**
 * 기본 포켓몬 리스트를 관리하는 커스텀 훅
 * 초기 데이터 로드 및 무한 스크롤을 통한 추가 데이터 로드를 처리
 */
export default function useGetDefaultItems() {
  const [defaultItems, setDefaultItems] = useState<Pokemon[]>([]);
  const [hasNextItems, setHasNextItems] = useState(true);
  const { showError } = useErrorModalContext();

  /**
   * 기본 리스트를 생성하는 함수
   */
  const fetchDefaultItems = useCallback(async () => {
    try {
      const fetchedList = await FetchPokemonList({
        startOffset: 1,
        batchSize: BATCH_SIZE,
      });

      if (fetchedList) {
        setDefaultItems(fetchedList);
        setHasNextItems(fetchedList.length === BATCH_SIZE);
      } else {
        setHasNextItems(false);
      }
    } catch (error) {
      showError("포켓몬 리스트를 가져오는데 실패했습니다:", error);
    }
  }, [showError]);

  /**
   * 무한 스크롤을 통해 기본 리스트의 뒷 부분에 추가 데이터를 병합하는 함수
   */
  const fetchNextDefaultItems = useCallback(async () => {
    if (!defaultItems.length) return;

    try {
      const startOffset = defaultItems[defaultItems.length - 1].id + 1;
      const fetchedList = await FetchPokemonList({
        startOffset,
        batchSize: BATCH_SIZE,
      });

      if (fetchedList) {
        setDefaultItems((prev) => updatePokemonList(prev, fetchedList));
        setHasNextItems(fetchedList.length === BATCH_SIZE);
      } else {
        setHasNextItems(false);
      }
    } catch (error) {
      showError("포켓몬 리스트를 가져오는데 실패했습니다:", error);
    }
  }, [defaultItems, showError]);

  // 초기 데이터 로드
  useEffect(() => {
    if (!defaultItems.length) {
      fetchDefaultItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    defaultItems,
    hasNextItems,
    fetchNextDefaultItems,
  };
}

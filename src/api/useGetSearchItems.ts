import { useState, useCallback } from "react";
import { BATCH_SIZE } from "@/constants/pokedexList";
import FetchPokemonList from "@/api/pokemon/fetchPokemonList";
import updatePokemonList from "@/utils/pokemon/updatePokemonList";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";

/**
 * 검색된 포켓몬 리스트를 관리하는 커스텀 훅
 * 검색 결과 로드 및 양방향 무한 스크롤을 처리
 */
export default function useGetSearchItems() {
  const [searchItems, setSearchItems] = useState<Pokemon[]>([]);
  const [hasNextItems, setHasNextItems] = useState(true);
  const { showError } = useErrorModalContext();

  /**
   * 포켓몬 id를 통해 검색 리스트를 생성하는 함수
   */
  const fetchSearchItemsByPokemonId = useCallback(
    async (pokemonId: number) => {
      try {
        const fetchedList = await FetchPokemonList({
          startOffset: pokemonId - 10,
          batchSize: BATCH_SIZE + 10,
        });

        if (fetchedList) {
          setSearchItems(fetchedList);
          setHasNextItems(true);
        }
      } catch (error) {
        showError("검색한 포켓몬 리스트를 가져오는데 실패했습니다:", error);
      }
    },
    [showError],
  );

  /**
   * 무한 스크롤을 통해 검색 리스트의 뒷부분에 추가 데이터를 결합하는 함수
   */
  const fetchNextSearchItems = useCallback(async () => {
    if (!searchItems.length) return;

    try {
      const startOffset = searchItems[searchItems.length - 1].id + 1;
      const fetchedList = await FetchPokemonList({
        startOffset,
        batchSize: BATCH_SIZE,
      });

      if (fetchedList) {
        setSearchItems((prev) => updatePokemonList(prev, fetchedList));
        setHasNextItems(fetchedList.length === BATCH_SIZE);
      } else {
        setHasNextItems(false);
      }
    } catch (error) {
      showError(
        "검색된 포켓몬 리스트의 추가 데이터를 가져오는데 실패했습니다:",
        error,
      );
    }
  }, [searchItems, showError]);

  /**
   * 검색 리스트를 초기화하는 함수
   */
  const clearSearchItems = useCallback(() => {
    setSearchItems([]);
    setHasNextItems(true);
  }, []);

  return {
    searchItems,
    hasNextItems,
    fetchNextSearchItems,
    fetchSearchItemsByPokemonId,
    clearSearchItems,
  };
}

import { useCallback } from "react";
import { THRESHOLD } from "@/constants/pokedexList";

interface useInfiniteScrollRefManagerProps {
  defaultItems: Pokemon[];
  searchItems: Pokemon[];
  lastDefaultItemRef: ((element: HTMLElement | null) => void) | null;
  firstSearchItemRef: ((element: HTMLElement | null) => void) | null;
  lastSearchItemRef: ((element: HTMLElement | null) => void) | null;
  scrollToElementRef:
    | ((item: Pokemon | null, element: HTMLElement | null) => void)
    | null;
  updateSelectedItemRef:
    | ((item: Pokemon | null, element: HTMLElement | null) => void)
    | null;
}

export default function useInfiniteScrollRefManager({
  defaultItems,
  searchItems,
  lastDefaultItemRef,
  firstSearchItemRef,
  lastSearchItemRef,
  scrollToElementRef,
  updateSelectedItemRef,
}: useInfiniteScrollRefManagerProps) {
  // Skeleton 아이템용 ref 등록 함수
  const registerSkeletonRef = useCallback(
    (pokemon: Pokemon | null, element: HTMLElement | null) => {
      if (!element) return;

      if (pokemon) {
        // 캐시된 데이터가 있는 경우: 위치 감지와 스크롤 ref만 할당
        scrollToElementRef?.(pokemon, element);
        updateSelectedItemRef?.(pokemon, element);
      } else {
        // 캐시된 데이터가 없는 경우: 무한스크롤 트리거
        firstSearchItemRef?.(element);
      }
    },
    [firstSearchItemRef, scrollToElementRef, updateSelectedItemRef],
  );

  // Pokemon 아이템용 ref 등록 함수
  const registerPokemonRef = useCallback(
    (item: Pokemon) => (element: HTMLElement | null) => {
      if (!scrollToElementRef || !updateSelectedItemRef) return;

      scrollToElementRef(item, element);
      updateSelectedItemRef(item, element);

      if (!lastSearchItemRef) return;

      const itemIndex = searchItems.findIndex((p) => p.id === item.id);

      if (searchItems.length > 0) {
        // 현재 불러온 아이템이 searchItems인 경우
        if (itemIndex >= searchItems.length - THRESHOLD) {
          lastSearchItemRef(element);
        }
      } else {
        // 현재 불러온 아이템이 defaultItems인 경우
        const mainListLength = defaultItems.length;
        const lastItemId = defaultItems[mainListLength - 1].id;

        // item의 id가 마지막 아이템으로부터 THRESHOLD 범위 내에 있는지 확인
        if (item.id <= lastItemId && item.id > lastItemId - THRESHOLD) {
          lastDefaultItemRef?.(element);
        }
      }
    },
    [
      searchItems,
      defaultItems,
      lastSearchItemRef,
      lastDefaultItemRef,
      scrollToElementRef,
      updateSelectedItemRef,
    ],
  );

  return { registerSkeletonRef, registerPokemonRef };
}

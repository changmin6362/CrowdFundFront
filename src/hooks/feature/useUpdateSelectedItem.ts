import { useEffect, useCallback, useRef } from "react";
import { usePokemonContext } from "@/app/contexts/selectedPokemonContext";
import { checkIntersection } from "@/utils/intersection";
import useRefMap from "@/hooks/feature/useRefMap";

interface useUpdateSelectedItemProps {
  displayList: Pokemon[];
  searchItemGroups: Pokemon[][];
}

// 스크롤 이벤트와 데이터 페칭 시 선택된 포켓몬을 업데이트 하는 함수
export default function useUpdateSelectedItem({
  displayList,
  searchItemGroups,
}: useUpdateSelectedItemProps) {
  // Context에서 포켓몬 선택 함수 가져오기
  const { setSelectedPokemon } = usePokemonContext();

  // 아이템을 감지하는 감지선에 대한 참조를 저장하는 ref 생성
  const detectItemRef = useRef<HTMLDivElement>(null);

  const { setRef, itemRefs } = useRefMap();

  // ref에 닿은 아이템을 감지하는 함수
  const updateSelectedItem = useCallback(() => {
    const detector = detectItemRef.current;

    // 감지선이 없으면 함수 종료
    if (!detector) return;

    // 감지선의 위치 정보 가져오기
    const detectorRect = detector.getBoundingClientRect();

    // Map에 저장된 요소들을 순회하며 감지선과 교차 여부 확인
    for (const [id, element] of itemRefs.current) {
      const elementRect = element.getBoundingClientRect();
      // 요소가 중앙 감지선과 교차하는지 확인
      const isIntersecting = checkIntersection({
        elementRect,
        detectorRect,
      });

      // 교차하는 요소를 찾으면 해당 아이템을 선택하고 순회 종료
      if (isIntersecting) {
        const pokemon = displayList.find((p) => p.id === id);
        if (pokemon) {
          setSelectedPokemon(pokemon);
          break; // 첫 번째 교차 요소를 찾으면 종료
        }

        // displayList에 없다면 searchItemGroups에서 검색
        const cachedPokemon = searchItemGroups.flat().find((p) => p?.id === id);

        if (cachedPokemon) {
          setSelectedPokemon(cachedPokemon);
          break;
        }
      }
    }
  }, [
    detectItemRef,
    displayList,
    searchItemGroups,
    setSelectedPokemon,
    itemRefs,
  ]);

  // 화면에 보이는 아이템을 등록하는 함수
  const updateSelectedItemRef = useCallback(
    (item: Pokemon | null, element: HTMLElement | null) => {
      if (element && item) {
        setRef(item.id, element);
      }
    },
    [setRef],
  );

  // 스크롤 이벤트 리스너 등록 및 제거
  useEffect(() => {
    const container = detectItemRef.current?.parentElement;
    if (!container) return;

    container.addEventListener("scroll", updateSelectedItem, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateSelectedItem);
    };
  }, [detectItemRef, updateSelectedItem]);

  // displayList가 변경될 때마다 중앙 포켓몬 재감지
  useEffect(() => {
    updateSelectedItem();
  }, [displayList, updateSelectedItem]);

  // 요소 등록 함수와 중앙 감지선 ref 반환
  return { updateSelectedItemRef, detectItemRef };
}

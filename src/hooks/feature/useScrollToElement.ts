import { useCallback, useState } from "react";

import useRefMap from "@/hooks/feature/useRefMap";

interface UseScrollToElementProps {
  scrollContainerRef: React.RefObject<HTMLElement>;
}

export default function useScrollToElement({
  scrollContainerRef,
}: UseScrollToElementProps) {
  const { setRef, getRef, clearRefs } = useRefMap();

  // ref Map을 초기화하는 함수
  const resetRefs = useCallback(() => {
    clearRefs();
    setPendingScrollId(null);
  }, [clearRefs]);

  // 아직 DOM에 마운트되지 않은 element에 대한 스크롤 요청을 저장
  const [pendingScrollId, setPendingScrollId] = useState<number | null>(null);

  // Map 특정 id의 element를 찾아 이동하는 함수
  const scrollToElement = useCallback(
    (id: number) => {
      // Map에서 해당 키에 대응하는 DOM 요소를 가져옴
      const targetElement = getRef(id);

      // 대상 요소나 스크롤 컨테이너가 없으면 나중을 위해 pendingScrollId 설정
      if (!targetElement || !scrollContainerRef.current) {
        setPendingScrollId(id);
        return;
      }

      // 스크롤 컨테이너의 높이 계산
      const { clientHeight: containerHeight } = scrollContainerRef.current;
      // 대상 element의 높이 계산
      const { offsetHeight: elementHeight, offsetTop } = targetElement;
      // element를 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
      const scrollPosition = offsetTop - (containerHeight - elementHeight) / 2;

      // 계산된 위치로 부드럽게 스크롤
      scrollContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      // 스크롤 실행 후 pendingScrollId 초기화
      setPendingScrollId(null);
    },

    [scrollContainerRef, getRef],
  );

  // DOM 요소가 마운트될 때 해당 element와 id를 Map에 매핑하는 ref 콜백 함수
  const scrollToElementRef = useCallback(
    (item: Pokemon | null, element: HTMLElement | null) => {
      if (element && item) {
        // element와 element의 id를 Map에 저장
        setRef(item.id, element);
        // element가 이전에 마운트 된 적이 있는지 체크
        if (pendingScrollId === item.id) {
          const targetElement = getRef(item.id);
          if (targetElement && scrollContainerRef.current) {
            // 스크롤 위치 계산 및 스크롤 실행
            const containerHeight = scrollContainerRef.current.clientHeight;
            const elementHeight = targetElement.offsetHeight;
            const scrollPosition =
              targetElement.offsetTop - (containerHeight - elementHeight) / 2;

            scrollContainerRef.current.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
            // 스크롤 실행 후 pendingScrollId 초기화
            setPendingScrollId(null);
          }
        }
      }
    },
    [pendingScrollId, scrollContainerRef, getRef, setRef],
  );

  return {
    scrollToElementRef,
    scrollToElement,
    resetRefs,
  };
}

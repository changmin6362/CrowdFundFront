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

  // 아직 DOM에 마운트되지 않은 요소에 대한 스크롤 요청을 저장
  const [pendingScrollId, setPendingScrollId] = useState<number | null>(null);

  // 특정 요소로 스크롤하는 함수
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
      // 대상 요소의 높이 계산
      const { offsetHeight: elementHeight, offsetTop } = targetElement;
      // 요소를 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
      const scrollPosition = offsetTop - (containerHeight - elementHeight) / 2;

      // 계산된 위치로 부드럽게 스크롤
      scrollContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      // 스크롤 실행 후 pendingScrollId 초기화
      setPendingScrollId(null);
    },

    [scrollContainerRef],
  );

  // DOM 요소에 ref를 할당하고 필요한 경우 스크롤을 수행하는 함수
  const scrollToElementRef = useCallback(
    (item: Pokemon | null, element: HTMLElement | null) => {
      if (element && item) {
        // 새로운 요소를 Map에 저장
        setRef(item.id, element);
        // 이 요소가 이전에 스크롤이 요청되었던 요소라면
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
    [pendingScrollId, scrollContainerRef],
  );

  return {
    scrollToElementRef,
    scrollToElement,
    resetRefs,
  };
}

import { RefObject, useCallback, useRef, useEffect } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
  disabled?: boolean;
}

export default function useInfiniteScroll({
  hasMore,
  loadMore,
  scrollContainerRef,
  disabled = false,
}: UseInfiniteScrollProps) {
  // ref가 할당된 요소를 추적하기 위한 ref
  const targetRef = useRef<HTMLElement | null>(null);

  // ref가 할당된 요소가 스크롤 컨테이너 내에 있는지 확인하는 함수
  const checkVisibility = useCallback(() => {
    // disabled가 true, hasMore이 false라면 리턴
    if (disabled || !hasMore) return;

    // ref가 할당된 요소나 스크롤 컨테이너가 없으면 종료
    if (!targetRef.current || !scrollContainerRef.current) return;

    // 스크롤 컨테이너와 타겟 요소의 위치 정보 가져오기
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    // 타겟 요소가 스크롤 컨테이너 내부에 완전히 들어와 있는지 확인
    const isVisible =
      targetRect.top >= containerRect.top &&
      targetRect.bottom <= containerRect.bottom;

    // 타겟 요소가 보여지면 함수 실행
    if (isVisible) {
      loadMore();
    }
  }, [hasMore, loadMore, disabled, scrollContainerRef]);

  // 스크롤 이벤트 리스너 등록 및 제거
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || disabled || !hasMore) return;

    // 스크롤 이벤트에 checkVisibility 함수 연결
    container.addEventListener("scroll", checkVisibility);
    // 컴포넌트 마운트 시 초기 체크 수행
    checkVisibility();

    // cleanup: 이벤트 리스너 제거
    return () => {
      container.removeEventListener("scroll", checkVisibility);
    };
  }, [checkVisibility, scrollContainerRef, disabled, hasMore]);

  // ref를 할당하고 visibility를 체크하는 콜백 함수
  const LastItemRef = useCallback(
    (node: HTMLElement | null) => {
      // 새로운 요소에 ref 할당
      targetRef.current = node;
      // 요소가 존재하면 즉시 visibility 체크
      if (node && !disabled && hasMore) {
        checkVisibility();
      }
    },
    [checkVisibility],
  );

  return LastItemRef;
}

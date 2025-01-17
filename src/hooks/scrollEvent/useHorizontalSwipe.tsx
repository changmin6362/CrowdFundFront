import { useRef, useEffect, useCallback, useMemo } from "react";
import { useSwipeable } from "react-swipeable";

// 수평 스크롤을 감지해서 스와이프 동작을 수행하는 커스텀 훅
export default function useHorizontalSwipe(
  // 왼쪽 스와이프 동작 시 실행될 함수
  onSwipeLeft: () => void,
  // 오른쪽 스와이프 동작 시 실행될 함수
  onSwipeRight: () => void,
) {
  // 수평 스크롤 이벤트를 감지하기 위한 ref
  const swipeAreaRef = useRef<HTMLDivElement | null>(null);

  // useSwipeable에 전달될 인자
  const swipeHandlers = useMemo(
    () => ({
      onSwipedLeft: onSwipeLeft,
      onSwipedRight: onSwipeRight,
      // 마우스 동작도 스와이프로 인식하게 함
      trackMouse: true,
    }),
    [onSwipeLeft, onSwipeRight],
  );

  // swipeableRef: 스와이프 동작을 감지하기 위한 ref
  const { ref: swipeableRef, ...swipeProps } = useSwipeable(swipeHandlers);

  // 수평스크롤 이벤트 핸들러
  const handleHorizontalScroll = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) {
          onSwipeLeft();
        } else if (e.deltaX < 0) {
          onSwipeRight();
        }
      }
    },
    [onSwipeLeft, onSwipeRight],
  );

  // 수평 이벤트 리스너 추가 및 제거
  useEffect(() => {
    const container = swipeAreaRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleHorizontalScroll, {
      passive: true,
    });

    // 클린업 함수
    return () => {
      container.removeEventListener("wheel", handleHorizontalScroll);
    };
  }, [handleHorizontalScroll]);

  // 두 ref를 하나로 결합함
  const combinedRef = useCallback(
    (el: HTMLDivElement | null) => {
      swipeAreaRef.current = el;
      swipeableRef(el);
    },
    [swipeableRef],
  );

  return { combinedRef, swipeProps };
}

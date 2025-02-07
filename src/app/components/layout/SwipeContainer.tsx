import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";

// 좌우 스와이프로 화면 전환을 제어하는 훅
function useSwipeNavigation() {
  // 현재 화면이 상세 정보를 표시하는지 여부를 관리
  const [showDetails, setShowDetails] = useState(false);

  // 스와이프 영역을 참조하기 위한 ref
  const navigationAreaRef = useRef<HTMLDivElement | null>(null);

  // 스와이프 핸들러 설정
  const swipeHandlers = useMemo(
    () => ({
      onSwipedLeft: () => setShowDetails(true),
      onSwipedRight: () => setShowDetails(false),
      // 마우스 드래그도 스와이프로 인식하게 함
      trackMouse: true,
    }),
    [],
  );

  const { ref: swipeableRef, ...swipeProps } = useSwipeable(swipeHandlers);

  // 수평 스크롤을 통한 화면 전환 처리
  const handleNavigationScroll = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0) {
        setShowDetails(true);
      } else if (e.deltaX < 0) {
        setShowDetails(false);
      }
    }
  }, []);

  // 수평 이벤트 리스너 추가 및 제거
  useEffect(() => {
    const container = navigationAreaRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleNavigationScroll, {
      passive: true,
    });

    // 클린업 함수
    return () => {
      container.removeEventListener("wheel", handleNavigationScroll);
    };
  }, [handleNavigationScroll]);

  // 두 ref를 하나로 결합함
  const combinedRef = useCallback(
    (el: HTMLDivElement | null) => {
      navigationAreaRef.current = el;
      swipeableRef(el);
    },
    [swipeableRef],
  );

  // 화면 전환 애니메이션을 위한 transform 스타일
  const transformStyle = useMemo(
    () => ({
      transform: showDetails ? "translateX(-50%)" : "translateX(0)",
      width: "200%",
      transition: "transform 300ms ease-in-out",
    }),
    [showDetails],
  );

  return { combinedRef, swipeProps, transformStyle };
}

interface SwipeContainerProps {
  children: React.ReactNode;
}

export default function SwipeContainer({ children }: SwipeContainerProps) {
  const { combinedRef, swipeProps, transformStyle } = useSwipeNavigation();
  return (
    <div className="relative w-full overflow-hidden">
      <div ref={combinedRef} {...swipeProps}>
        <div className="flex gap-1" style={transformStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

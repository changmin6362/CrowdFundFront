import { useState, useCallback, useMemo } from "react";

import PokemonTypeDisplay from "@/app/sections/PokemonTypeDisplay";
import useHorizontalSwipe from "@/hooks/useHorizontalSwipe";
import PokedexListDisplay from "@/app/sections/PokeDex/PokedexListDisplay";

// 가로 스크롤을 감지해서 스와이프 동작을 수행하는 컨테이너
export default function SwipeContainer() {
  // 상세 정보 표시 여부를 관리하는 로컬 state
  const [showDetails, setShowDetails] = useState(false);

  // 상세 정보 표시 상태를 변경하는 콜백 함수
  const handleShowDetails = useCallback((show: boolean) => {
    setShowDetails(show);
  }, []);

  // useHorizontalSwipe 훅 사용
  const { combinedRef, swipeProps } = useHorizontalSwipe(
    () => handleShowDetails(true), // 왼쪽 스와이프
    () => handleShowDetails(false), // 오른쪽 스와이프
  );

  // 변환 스타일 계산
  const transformStyle = useMemo(
    () => ({
      transform: showDetails ? "translateX(-50%)" : "translateX(0)",
      width: "200%",
    }),
    [showDetails],
  );

  return (
    <div ref={combinedRef} {...swipeProps}>
      <div
        className="flex gap-1 transition-transform duration-300 ease-in-out"
        style={transformStyle}
      >
        <PokedexListDisplay />
        <PokemonTypeDisplay />
      </div>
    </div>
  );
}

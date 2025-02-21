import { RefObject } from "react";

import ListContainer from "@/app/components/ui/listContainer";
import ListWrapper from "@/app/components/ui/listContainer/listWrapper";
import InitialContentRenderer from "@/app/components/ui/listContainer/initialContentRenderer";
import DetectionLine from "@/app/components/ui/detectionLine";

import PreloadedSkeletonUI from "./preloadedSkeletonUI";

interface PokedexScrollViewProps {
  displayList: Pokemon[];
  searchItemGroups: Pokemon[][];
  isViewSkeleton: boolean;
  registerSkeletonRef: (
    pokemon: Pokemon | null,
    element: HTMLElement | null,
  ) => void;
  registerPokemonRef: (item: Pokemon) => (element: HTMLElement | null) => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
  handleScrollFocus: () => void;
  detectItemRef: RefObject<HTMLDivElement>;
}

export default function PokedexScrollView({
  displayList,
  searchItemGroups,
  isViewSkeleton,
  registerSkeletonRef,
  registerPokemonRef,
  scrollContainerRef,
  handleScrollFocus,
  detectItemRef,
}: PokedexScrollViewProps) {
  return (
    // 포켓몬 리스트를 감싸는 스크롤 가능한 컨테이너 컴포넌트
    <>
      <ListContainer
        scrollContainerRef={scrollContainerRef}
        handleScrollFocus={handleScrollFocus}
      >
        <ListWrapper>
          {/* 다음 데이터를 위한 스켈레톤 UI */}
          {isViewSkeleton && (
            <PreloadedSkeletonUI
              displayList={displayList}
              searchItemGroups={searchItemGroups}
              registerSkeletonRef={registerSkeletonRef}
            />
          )}
          {/* 초기 데이터 렌더링; 아랫방향의 무한스크롤이 이루어질 때는 이 곳에서 추가된 데이터가 렌더링된다. */}
          <InitialContentRenderer
            displayList={displayList}
            registerPokemonRef={registerPokemonRef}
          />
        </ListWrapper>
        {/* 아이템 선택용 감지선 */}
        <DetectionLine ref={detectItemRef} />
      </ListContainer>
    </>
  );
}

import { useRef } from "react";
import useInfiniteScroll from "@/hooks/scrollEvent/useInfiniteScroll";
import useScrollToElement from "@/hooks/feature/useScrollToElement";
import useRefManager from "@/hooks/feature/useRefManager";
import useBlurControl from "@/hooks/feature/useBlurControl";
import PokedexScrollView from "@/app/components/page/main/pokedex/components/pokedexScrollView/";
import usePokemonIdSearch from "@/hooks/usePokemonIdSearch";
import useUpdateSelectedItem from "@/hooks/feature/useUpdateSelectedItem";
import SearchBar from "@/app/components/page/main/pokedex/components/searchBar/";

export default function Pokedex() {
  // 스크롤 컨테이너에 대한 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 관련 기능을 제공하는 커스텀 훅
  const { scrollToElementRef, scrollToElement } = useScrollToElement({
    scrollContainerRef,
  });

  // 입력 필드 포커스 제어를 위한 커스텀 훅
  const { inputRef, handleScrollFocus } = useBlurControl();

  // 검색 기능 훅
  const {
    defaultData,
    defaultActions,
    searchData,
    searchActions,
    isLoading,
    handleSearch,
  } = usePokemonIdSearch({
    scrollToElement,
  });

  // 기본 데이터 무한스크롤
  const lastDefaultItemRef = useInfiniteScroll({
    hasMore: defaultData.hasNext,
    loadMore: defaultActions.fetchNext,
    scrollContainerRef,
    disabled: isLoading,
  });

  // 검색 리스트의 첫 번째 아이템에 대해 데이터 요청을 시도하는 무한스크롤 ref
  const firstSearchItemRef = useInfiniteScroll({
    hasMore: searchData.hasPrevious,
    loadMore: searchActions.fetchPrevious,
    scrollContainerRef,
    disabled: isLoading,
  });

  // 검색 리스트의 마지막 아이템에 대해 데이터 요청을 시도하는 무한스크롤 ref
  const lastSearchItemRef = useInfiniteScroll({
    hasMore: searchData.hasNext,
    loadMore: searchActions.fetchNext,
    scrollContainerRef,
    disabled: isLoading,
  });

  // 화면 표시 리스트
  const displayList =
    searchData.items.length > 0 ? searchData.items : defaultData.items;

  // 아이템 선택 감지
  const { updateSelectedItemRef, detectItemRef } = useUpdateSelectedItem({
    displayList,
    searchItemGroups: searchData.groups,
  });

  // ref 등록 관리
  const { registerSkeletonRef, registerPokemonRef } = useRefManager({
    defaultItems: defaultData.items,
    searchItems: searchData.items,
    lastDefaultItemRef,
    firstSearchItemRef,
    lastSearchItemRef,
    scrollToElementRef,
    updateSelectedItemRef,
  });

  return (
    <div className="flex h-[270px] w-full flex-col gap-8 p-8">
      {/* 검색 바 컴포넌트 */}
      <SearchBar handleSearch={handleSearch} inputRef={inputRef} />
      {/* 포켓몬 도감 스크롤 뷰 컴포넌트 */}
      <PokedexScrollView
        displayList={displayList}
        searchItemGroups={searchData.groups}
        isViewSkeleton={searchData.items.length > 0}
        registerSkeletonRef={registerSkeletonRef}
        registerPokemonRef={registerPokemonRef}
        scrollContainerRef={scrollContainerRef}
        handleScrollFocus={handleScrollFocus}
        detectItemRef={detectItemRef}
      />
      <div className="modal-button text-sm font-medium text-gray-600">
        <span className="">슬라이드로 자세한 정보 보기</span>
        <span className="">➜</span>
      </div>
    </div>
  );
}

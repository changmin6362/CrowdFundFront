import { useRef } from "react";
import useGetDefaultItems from "@/api/pokemon/useGetDefaultItems";
import useInfiniteScroll from "@/hooks/scrollEvent/useInfiniteScroll";
import useScrollToElement from "@/hooks/feature/useScrollToElement";
import useRefManager from "@/hooks/feature/useRefManager";
import useBlurControl from "@/hooks/feature/useBlurControl";
import PokedexScrollView from "@/app/components/page/main/pokedex/PokedexScrollView";
import useSearchPokemon from "@/utils/pokemon/useSearchPokemon";
import useUpdateSelectedItem from "@/hooks/feature/useUpdateSelectedItem";
import SearchBar from "@/app/components/page/main/pokedex/SearchBar";

export default function Pokedex() {
  // 스크롤 컨테이너에 대한 ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 관련 기능을 제공하는 커스텀 훅
  const { scrollToElementRef, scrollToElement, resetRefs } = useScrollToElement(
    {
      scrollContainerRef,
    },
  );

  // 입력 필드 포커스 제어를 위한 커스텀 훅
  const { inputRef, handleScrollFocus } = useBlurControl();

  // 기본 리스트의 데이터 호출을 위한 커스텀 훅
  const { defaultItems, hasNextItems, appendNextDefaultItems } =
    useGetDefaultItems();

  // 검색 기능을 수행하는 함수
  const {
    searchItems,
    hasNextItemsSearch,
    appendNextSearchItems,
    handleSearch,
    isLoadingSearch,
    searchItemGroups,
    hasPreviousItems,
    appendPreviousSearchItems,
  } = useSearchPokemon({
    defaultItems,
    scrollToElement,
    resetRefs,
  });

  // 기본 리스트의 마지막 아이템에 대해 데이터 요청을 시도하는 무한스크롤 ref
  const lastDefaultItemRef = useInfiniteScroll({
    hasMore: hasNextItems,
    loadMore: appendNextDefaultItems,
    scrollContainerRef,
    disabled: isLoadingSearch,
  });

  // 검색 리스트의 첫 번째 아이템에 대해 데이터 요청을 시도하는 무한스크롤 ref
  const firstSearchItemRef = useInfiniteScroll({
    hasMore: hasPreviousItems,
    loadMore: appendPreviousSearchItems,
    scrollContainerRef,
    disabled: isLoadingSearch,
  });

  // 검색 리스트의 마지막 아이템에 대해 데이터 요청을 시도하는 무한스크롤 ref
  const lastSearchItemRef = useInfiniteScroll({
    hasMore: hasNextItemsSearch,
    loadMore: appendNextSearchItems,
    scrollContainerRef,
    disabled: isLoadingSearch,
  });

  const displayList = searchItems.length > 0 ? searchItems : defaultItems;

  // 데이터 업데이트와 스크롤 이벤트에 의한 중앙 요소 감지 처리를 하는 함수
  const { updateSelectedItemRef, detectItemRef } = useUpdateSelectedItem({
    displayList,
    searchItemGroups,
  });

  // ref를 등록하는 콜백 함수 선언
  const { registerSkeletonRef, registerPokemonRef } = useRefManager({
    defaultItems,
    searchItems,
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
        searchItemGroups={searchItemGroups}
        isViewSkeleton={searchItems.length > 0}
        registerSkeletonRef={registerSkeletonRef}
        registerPokemonRef={registerPokemonRef}
        scrollContainerRef={scrollContainerRef}
        handleScrollFocus={handleScrollFocus}
        detectItemRef={detectItemRef}
      />
    </div>
  );
}

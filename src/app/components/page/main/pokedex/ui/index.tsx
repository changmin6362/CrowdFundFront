import { forwardRef, RefObject } from "react";

import getItemText from "@/utils/pokemon/getItemText";
import PokemonScrollItem from "@/app/components/ui/PokemonScrollItem";
import { BATCH_SIZE, EMPTY_ITEMS_COUNT } from "@/constants/pokedexList";

import { POKEMON_IMAGE } from "@/constants/pokedexList";

interface ScrollContainerProps {
  children: React.ReactNode;
  scrollContainerRef: RefObject<HTMLDivElement>;
  handleScrollFocus: () => void;
}

// // 포켓몬 리스트를 감싸는 스크롤 가능한 컨테이너 컴포넌트 렌더링
const ScrollContainer = ({
  children,
  scrollContainerRef,
  handleScrollFocus,
}: ScrollContainerProps) => {
  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex h-[148px] flex-col gap-1 overflow-y-auto px-8"
        onScroll={handleScrollFocus}
      >
        {children}
      </div>
    </div>
  );
};

interface PokemonListPaddingProps {
  children: React.ReactNode;
}

// 여백을 위한 빈 공간 렌더링 (ref 할당 없음)
const PokemonListPadding = ({ children }: PokemonListPaddingProps) => {
  return (
    <>
      {Array(EMPTY_ITEMS_COUNT)
        .fill(null)
        .map((_, index) => (
          <PokemonScrollItem
            key={`empty-space-top-${index}`}
            imageUrl={null}
            imageAlt="Empty Slot"
            infoText=""
          />
        ))}
      {children}
      {Array(EMPTY_ITEMS_COUNT)
        .fill(null)
        .map((_, index) => (
          <PokemonScrollItem
            key={`empty-space-bottom-${index}`}
            imageUrl={null}
            imageAlt="Empty Slot"
            infoText=""
          />
        ))}
    </>
  );
};

interface CreateBatchSkeletonsProps {
  provideSkeletonData: ({ itemIndex }: { itemIndex: number }) => {
    itemId: number;
    preloadedPokemon: Pokemon | undefined;
    isValidId: boolean;
  };
  registerSkeletonRef: (
    pokemon: Pokemon | null,
    element: HTMLElement | null,
  ) => void;
}

// 스크롤 컴포넌트의 스켈레톤 UI를 생성하는 함수
const CreateBatchSkeletons = ({
  provideSkeletonData,
  registerSkeletonRef,
}: CreateBatchSkeletonsProps) => {
  // BATCH_SIZE만큼의 아이템을 생성
  return Array(BATCH_SIZE)
    .fill(null)
    .map((_, itemIndex) => {
      // 현재 아이템의 데이터를 가져옴
      const { itemId, preloadedPokemon, isValidId } = provideSkeletonData({
        itemIndex,
      });

      // 아직 로드되지 않은 데이터를 참조하는 스켈레톤UI에 전달할 임시 데이터
      const skeletonPokemon = {
        id: itemId,
        name: "",
      } as Pokemon;

      // ID가 유효한 경우에만 아이템을 렌더링
      return isValidId ? (
        <PokemonScrollItem
          key={`skeleton-${itemId}`}
          imageUrl={
            preloadedPokemon
              ? POKEMON_IMAGE.OFFICIAL_ARTWORK(preloadedPokemon)
              : null
          }
          imageAlt={preloadedPokemon ? preloadedPokemon.name : "Skeleton"}
          infoText={getItemText(preloadedPokemon || skeletonPokemon)}
          registerSkeletonRef={(element) =>
            registerSkeletonRef(preloadedPokemon || null, element)
          }
        />
      ) : null;
    });
};

interface PokemonListItemProps {
  displayList: Pokemon[];
  registerPokemonRef: (item: Pokemon) => (element: HTMLElement | null) => void;
}

// 실제 포켓몬 데이터 렌더링
const PokemonListItem = ({
  displayList,
  registerPokemonRef,
}: PokemonListItemProps) => {
  return (
    <>
      {displayList.map((pokemon) => (
        <PokemonScrollItem
          key={`pokemon-${pokemon.id}`}
          imageUrl={POKEMON_IMAGE.OFFICIAL_ARTWORK(pokemon)}
          imageAlt={pokemon.name}
          infoText={getItemText(pokemon)}
          registerPokemonRef={registerPokemonRef(pokemon)}
        />
      ))}
    </>
  );
};

// 아이템 선택용 감지선 렌더링, forwardRef로 ref 전달
const DetectionLine = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-1/2 h-[1px] bg-transparent"
      style={{ transform: "translateY(-50%)" }}
    />
  );
});

DetectionLine.displayName = "DetectionLine";

export {
  ScrollContainer,
  PokemonListPadding,
  CreateBatchSkeletons,
  PokemonListItem,
  DetectionLine,
};

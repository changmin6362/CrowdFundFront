import getItemText from "@/utils/pokemon/getItemText";
import ListItemCard from "@/app/components/ui/listItemCard";
import { BATCH_SIZE } from "@/constants/pokedexList";

import { POKEMON_IMAGE } from "@/constants/pokedexList";

interface SkeletonBatchRendererProps {
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

// Batch 단위로 스켈레톤 UI를 렌더링하는 컴포넌트
export default function SkeletonBatchRenderer({
  provideSkeletonData,
  registerSkeletonRef,
}: SkeletonBatchRendererProps) {
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
        <ListItemCard
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
}

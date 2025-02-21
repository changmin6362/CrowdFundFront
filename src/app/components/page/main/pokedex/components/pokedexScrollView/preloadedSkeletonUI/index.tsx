import { Fragment } from "react";
import { BATCH_SIZE } from "@/constants/pokedexList";
import SkeletonBatchRenderer from "@/app/components/ui/listContainer/skeletonBatchRenderer";

interface PreloadedSkeletonUIProps {
  displayList: Pokemon[];
  searchItemGroups: Pokemon[][];
  registerSkeletonRef: (
    pokemon: Pokemon | null,
    element: HTMLElement | null,
  ) => void;
}

// 데이터 로딩 전에 스켈레톤 UI를 미리 렌더링하는 함수
export default function PreloadedSkeletonUI({
  displayList,
  searchItemGroups,
  registerSkeletonRef,
}: PreloadedSkeletonUIProps) {
  // 시작 ID 계산
  const calculateStartId = (index: number): number => {
    if (index === 0) {
      return displayList[0].id - BATCH_SIZE;
    }
    return searchItemGroups[index - 1][0].id - BATCH_SIZE;
  };

  // 렌더링할 스켈레톤 UI 배치의 개수
  const skeletonBatchCount = (searchItemGroups?.length ?? 0) + 1;

  // groupCount만큼의 renderSkeletonItems을 생성, reverse()로 최신 데이터가 위쪽에 위치하도록 순서 변경
  return (
    <>
      {Array(skeletonBatchCount)
        .fill(null)
        .map((_, batchIndex) => {
          // 각 스켈레톤 UI에서 필요한 데이터를 전달하는 함수
          const provideSkeletonData = ({
            itemIndex,
          }: {
            itemIndex: number;
          }) => {
            const preloadedGroup =
              // batchIndex를 통해서 searchItemGroups의 요소를 순차적으로 조회함
              batchIndex === searchItemGroups.length
                ? null
                : searchItemGroups[batchIndex];
            const startId = calculateStartId(batchIndex);
            const itemId = startId + itemIndex;

            return {
              itemId,
              preloadedPokemon: preloadedGroup?.find(
                (pokemon) => pokemon.id === itemId,
              ),
              isValidId: itemId > 0,
            };
          };
          return (
            <Fragment key={`skeleton-group-${batchIndex}`}>
              <SkeletonBatchRenderer
                provideSkeletonData={provideSkeletonData}
                registerSkeletonRef={registerSkeletonRef}
              />
            </Fragment>
          );
        })
        .reverse()}
    </>
  );
}

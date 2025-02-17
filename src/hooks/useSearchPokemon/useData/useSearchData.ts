import useGetSearchItems from "@/api/pokemon/useGetSearchItems";
import useGetPreviousSearchItems from "@/api/pokemon/useGetPreviousSearchItems";

export default function useSearchData(initialSearchItems: Pokemon[]) {
  const {
    searchItems,
    hasNextItems,
    appendNextSearchItems,
    createsearchItemsByPokemonId,
    clearSearch,
  } = useGetSearchItems();

  const {
    searchItemGroups,
    hasPreviousItems,
    appendPreviousSearchItems,
    initializeGroups,
  } = useGetPreviousSearchItems({ initialSearchItems });

  return {
    searchData: {
      items: searchItems,
      groups: searchItemGroups,
      hasNext: hasNextItems,
      hasPrevious: hasPreviousItems,
    },
    dataActions: {
      appendNext: appendNextSearchItems,
      appendPrevious: appendPreviousSearchItems,
      createNewSet: createsearchItemsByPokemonId,
      clearSearch,
      initGroups: initializeGroups,
    },
  };
}

import useGetSearchItems from "@/api/pokemon/useGetSearchItems";
import useGetPreviousSearchItems from "@/api/pokemon/useGetPreviousSearchItems";

export default function useSearchData() {
  const {
    searchItems,
    hasNextItems,
    fetchNextSearchItems,
    fetchSearchItemsByPokemonId,
    clearSearchItems,
  } = useGetSearchItems();

  const {
    searchItemGroups,
    hasPreviousItems,
    initializeSearchGroups,
    fetchPreviousSearchItems,
  } = useGetPreviousSearchItems({ searchItems });

  return {
    searchData: {
      items: searchItems,
      groups: searchItemGroups,
      hasNext: hasNextItems,
      hasPrevious: hasPreviousItems,
    },
    searchActions: {
      fetchNext: fetchNextSearchItems,
      fetchPrevious: fetchPreviousSearchItems,
      fetchByPokemonId: fetchSearchItemsByPokemonId,
      clearItems: clearSearchItems,
      initializeGroups: initializeSearchGroups,
    },
  };
}

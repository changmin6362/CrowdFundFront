import useGetSearchItems from "@/api/useGetSearchItems";
import useGetPreviousSearchItems from "@/api/useGetPreviousSearchItems";

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
    resetSearchGroups,
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
      clearItems: () => {
        clearSearchItems();
        resetSearchGroups();
      },
      initializeGroups: initializeSearchGroups,
    },
  };
}

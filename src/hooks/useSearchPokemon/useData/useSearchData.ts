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
      fetchByPokemonId: async (pokemonId: number) => {
        await fetchSearchItemsByPokemonId(pokemonId);
        // searchItems가 업데이트된 후에 groups 초기화
        return searchItems;
      },
      clearItems: () => {
        clearSearchItems();
        resetSearchGroups();
      },
      initializeGroups: initializeSearchGroups,
    },
  };
}

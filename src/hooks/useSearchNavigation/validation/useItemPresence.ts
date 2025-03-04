export default function useItemPresence(
  defaultItems: Pokemon[],
  searchItems: Pokemon[],
  searchGroups: Pokemon[][],
) {
  const checkItemPresence = (pokemonId: number) => ({
    inDefault: defaultItems.some((p) => p.id === pokemonId),
    inSearch: searchItems.some((p) => p.id === pokemonId),
    inGroups: searchGroups.some((group) =>
      group.some((p) => p.id === pokemonId),
    ),
  });

  return { checkItemPresence };
}

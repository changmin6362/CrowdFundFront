// ID 순서대로 정렬하여 올바른 위치에 삽입하여 병합하는 함수
export default function updatePokemonList(
  currentList: Pokemon[],
  newPokemons: Pokemon[],
) {
  const allPokemons = [...currentList, ...newPokemons];
  return allPokemons
    .filter(
      (pokemon, index, self) =>
        index === self.findIndex((p) => p.id === pokemon.id),
    )
    .sort((a, b) => a.id - b.id);
}

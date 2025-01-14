// 선택된 포켓몬의 타입을 배열 형태로 바꿔주는 함수
export default function convertPokemonTypes(
  selectedPokemon: Pokemon | null,
): string[] {
  if (!selectedPokemon || !selectedPokemon.types) {
    return [];
  }

  return selectedPokemon.types.map((pokemon) => pokemon.type.name);
}

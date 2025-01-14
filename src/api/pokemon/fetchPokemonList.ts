import { P } from "@/utils/pokeapi";
import { MAX_POKEMON_ID } from "@/constants/pokedexList";

interface FetchPokemonListProps {
  startOffset: number;
  batchSize: number;
}

export default async function FetchPokemonList({
  startOffset,
  batchSize,
}: FetchPokemonListProps) {
  // startOffset이 1 미만인 경우 1로 설정
  const validStartOffset = Math.max(1, startOffset);

  // endId를 선언해서 불러올 수 있는 id의 한계를 MAX_POKEMON_ID로 제한함
  // MAX_POKEMON_ID까지의 포켓몬을 불러오기 위해 1을 더함
  const endId = Math.min(startOffset + batchSize, MAX_POKEMON_ID + 1);

  // startId부터 endId까지의 연속된 숫자 배열 생성
  const pokemonIds = Array.from(
    { length: endId - validStartOffset },
    (_, i) => validStartOffset + i,
  );

  // PokeAPI는 문자열 형태의 ID를 요구하므로 숫자 배열을 문자열 배열로 변환
  const stringPokemonIds = pokemonIds.map((id) => id.toString());

  // PokeAPI를 통해 포켓몬 데이터 fetch
  // Promise.all 사용으로 모든 api 요청을 배열로 모아서 한번에 반환함
  const pokemonResponses = await Promise.all(
    stringPokemonIds.map((id) => P.getPokemonByName(id)),
  );

  return pokemonResponses;
}

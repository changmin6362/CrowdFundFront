import MockData from "@/app/assets/mockData/Pokedex.json";

//MockData에서 파라미터와 일치하는 문자열을 찾는 함수
export default function searchPokemon(searchValue: string) {
  // 대소문자 구분 없이 검색하기 위해 소문자로 변환
  const trimmedValue = searchValue.trim().toLowerCase();
  if (!trimmedValue) return null;

  // MockData에서 한글, 영어, 일본어 이름으로 포켓몬 검색
  return MockData.find(
    (pokemon) =>
      pokemon.ko_name.toLowerCase() === trimmedValue ||
      pokemon.en_name.toLowerCase() === trimmedValue ||
      pokemon.jp_name.toLowerCase() === trimmedValue,
  );
}

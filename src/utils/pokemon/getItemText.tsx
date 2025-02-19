import MockData from "@/app/assets/mockData/Pokedex.json";

// pokemonId를 네자리 수로 변경해주는 함수; 000을 앞에 붙이려면 문자열로 바꿔야 한다.
function convertPokemonId(pokemonId: number): string {
  return pokemonId.toString().padStart(4, "0");
}

export default function getItemText(item: Pokemon) {
  // MockData에서 일치하는 id가 일치하는 아이템을 찾음
  const mockDataItem = MockData.find((mock) => mock.id === item.id);
  const koreanName = mockDataItem?.ko_name ?? "";
  const englishName = mockDataItem?.en_name ?? "";
  const japaneseName = mockDataItem?.jp_name ?? "";

  return `#${convertPokemonId(item.id)} ${koreanName} ${englishName} ${japaneseName}`;
}

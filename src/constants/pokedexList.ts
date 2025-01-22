// Pokedex에서 한번의 api 요청으로 불러오는 포켓몬 목록의 개수
export const BATCH_SIZE = 20;
// Pokedex의 PokemonListView에서 포켓몬 목록의 처음과 끝에 추가되는 빈 아이템의 개수
export const EMPTY_ITEMS_COUNT = 1;

// api 요청을 제한하기 위해 사용되는 마지막 포켓몬의 id 번호
export const MAX_POKEMON_ID = 1025;

// 마지막 아이템으로부터 몇개의 아이템까지 ref를 할당할 건지 정하는 수
export const THRESHOLD = 5 as const;

// pokeapi가 제공하는 최대 이미지 크기
export const MAX_IMAGE_SIZE = 512;

// pokemon 타입에서 이미지 경로를 가져오는 경로
export const POKEMON_IMAGE = {
  OFFICIAL_ARTWORK: (pokemon: Pokemon): string | null =>
    pokemon.sprites.other["official-artwork"].front_default,
  FRONT_DEFAULT: (pokemon: Pokemon): string | null =>
    pokemon.sprites.front_default,
  // 다른 이미지 경로도 필요하다면 여기에 추가
} as const;

// 포켓몬 타입 한글 이름
export const POKEMON_TYPE_KR = {
  normal: "노말",
  fighting: "격투",
  flying: "비행",
  poison: "독",
  ground: "땅",
  rock: "바위",
  bug: "벌레",
  ghost: "고스트",
  steel: "강철",
  fire: "불꽃",
  water: "물",
  grass: "풀",
  electric: "전기",
  psychic: "에스퍼",
  ice: "얼음",
  dragon: "드래곤",
  dark: "악",
  fairy: "페어리",
} as const;

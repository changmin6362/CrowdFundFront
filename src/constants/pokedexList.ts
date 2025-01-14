// Pokedex에서 한번의 api 요청으로 불러오는 포켓몬 목록의 개수
export const BATCH_SIZE = 20;
// Pokedex의 PokemonListView에서 포켓몬 목록의 처음과 끝에 추가되는 빈 아이템의 개수
export const EMPTY_ITEMS_COUNT = 1;

// api 요청을 제한하기 위해 사용되는 마지막 포켓몬의 id 번호
export const MAX_POKEMON_ID = 1025;

// 마지막 아이템으로부터 몇개의 아이템까지 ref를 할당할 건지 정하는 수
export const THRESHOLD = 5;

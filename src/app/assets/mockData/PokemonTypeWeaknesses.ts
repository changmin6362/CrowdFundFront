interface TypeWeakness {
  weak: string[];
  immune: string[];
  resist: string[];
}

interface PokemonTypeWeaknesses {
  [key: string]: TypeWeakness;
}

// 포켓몬의 각 타입의 약점 목록 - 6세대 이후 기준

export const PokemonTypeWeaknesses: PokemonTypeWeaknesses = {
  normal: { weak: ["fighting"], immune: ["ghost"], resist: [] },
  fighting: {
    weak: ["flying", "psychic", "fairy"],
    immune: [],
    resist: ["bug", "rock", "dark"],
  },
  flying: {
    weak: ["rock", "electric", "ice"],
    immune: ["ground"],
    resist: ["fighting", "bug", "grass"],
  },
  poison: {
    weak: ["ground", "psychic"],
    immune: [],
    resist: ["fighting", "poison", "bug", "grass", "fairy"],
  },
  ground: {
    weak: ["water", "grass", "ice"],
    immune: ["electric"],
    resist: ["poison", "rock"],
  },
  rock: {
    weak: ["water", "grass", "fighting", "ground", "steel"],
    immune: [],
    resist: ["normal", "flying", "poison", "fire"],
  },
  bug: {
    weak: ["flying", "rock", "fire"],
    immune: [],
    resist: ["fighting", "ground", "grass"],
  },
  ghost: {
    weak: ["ghost", "dark"],
    immune: ["normal", "Nighting"],
    resist: ["poison", "bug"],
  },
  steel: {
    weak: ["fighting", "ground", "fire"],
    immune: ["poison"],
    resist: [
      "normal",
      "flying",
      "rock",
      "bug",
      "steel",
      "grass",
      "psychic",
      "ice",
      "dragon",
      "fairy",
    ],
  },
  fire: {
    weak: ["water", "ground", "rock"],
    immune: [],
    resist: ["fire", "grass", "ice", "bug", "steel", "fairy"],
  },
  water: {
    weak: ["grass", "electric"],
    immune: [],
    resist: ["fire", "water", "ice", "steel"],
  },
  grass: {
    weak: ["flying", "poison", "bug", "fire", "ice"],
    immune: [],
    resist: ["water", "grass", "electric", "ground"],
  },
  electric: {
    weak: ["ground"],
    immune: [],
    resist: ["electric", "flying", "steel"],
  },
  psychic: {
    weak: ["bug", "ghost", "dark"],
    immune: [],
    resist: ["fighting", "psychic"],
  },
  ice: {
    weak: ["fighting", "rock", "steel", "fire"],
    immune: [],
    resist: ["ice"],
  },
  dragon: {
    weak: ["ice", "dragon", "fairy"],
    immune: [],
    resist: ["fire", "water", "grass", "electric"],
  },
  dark: {
    weak: ["fighting", "bug", "fairy"],
    immune: ["psychic"],
    resist: ["ghost", "dark"],
  },
  fairy: {
    weak: ["poison", "steel"],
    immune: ["dragon"],
    resist: ["fighting", "bug", "dark"],
  },
};

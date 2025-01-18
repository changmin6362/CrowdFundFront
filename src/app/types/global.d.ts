// 반복적으로 사용되는 타입을 전역으로 선언

declare global {
  interface PokemonDetails {
    id: number;
    en_name: string;
    ko_name: string;
    jp_name: string;
  }

  interface Pokemon {
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    forms: {
      name: string;
      url: string;
    }[];
    id: number;
    name: string;
    is_default: boolean;
    moves: {
      move: {
        name: string;
        url: string;
      };
      version_group_details: {
        level_learned_at: number;
        move_learn_method: {
          name: string;
          url: string;
        };
        version_group: {
          name: string;
          url: string;
        };
      }[];
    }[];
    order: number;
    species: {
      name: string;
      url: string;
    };
    sprites: {
      front_default: string | null;
      other: {
        "official-artwork": {
          front_default: string | null;
          front_shiny: string | null;
        };
      };
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
  }
}

export {};

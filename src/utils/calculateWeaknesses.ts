import { PokemonTypeWeaknesses } from "@/app/assets/mockData/PokemonTypeWeaknesses";

type DamageMultiplier = "4x" | "2x" | "0.5x" | "0.25x" | "0x";

type DamageMultipliers = {
  [key in DamageMultiplier | "1x"]: Set<string>;
};

export default function calculateWeaknesses(types: string[]) {
  const damageMultipliers: DamageMultipliers = {
    "4x": new Set<string>(),
    "2x": new Set<string>(),
    "1x": new Set<string>(),
    "0.5x": new Set<string>(),
    "0.25x": new Set<string>(),
    "0x": new Set<string>(),
  };

  // 모든 타입에 대해 기본 1배 데미지 설정
  Object.keys(PokemonTypeWeaknesses).forEach((type) =>
    damageMultipliers["1x"].add(type),
  );

  types.forEach((type) => {
    if (type in PokemonTypeWeaknesses) {
      PokemonTypeWeaknesses[type].weak.forEach((weakness) => {
        if (damageMultipliers["2x"].has(weakness)) {
          damageMultipliers["2x"].delete(weakness);
          damageMultipliers["4x"].add(weakness);
        } else if (damageMultipliers["1x"].has(weakness)) {
          damageMultipliers["1x"].delete(weakness);
          damageMultipliers["2x"].add(weakness);
        } else if (damageMultipliers["0.5x"].has(weakness)) {
          damageMultipliers["0.5x"].delete(weakness);
          damageMultipliers["1x"].add(weakness);
        }
      });

      PokemonTypeWeaknesses[type].resist.forEach((resistance) => {
        if (damageMultipliers["1x"].has(resistance)) {
          damageMultipliers["1x"].delete(resistance);
          damageMultipliers["0.5x"].add(resistance);
        } else if (damageMultipliers["2x"].has(resistance)) {
          damageMultipliers["2x"].delete(resistance);
          damageMultipliers["1x"].add(resistance);
        } else if (damageMultipliers["0.5x"].has(resistance)) {
          damageMultipliers["0.5x"].delete(resistance);
          damageMultipliers["0.25x"].add(resistance);
        }
      });

      PokemonTypeWeaknesses[type].immune.forEach((immunity) => {
        damageMultipliers["0x"].add(immunity);
        (Object.keys(damageMultipliers) as (DamageMultiplier | "1x")[]).forEach(
          (key) => {
            if (key !== "0x") damageMultipliers[key].delete(immunity);
          },
        );
      });
    }
  });

  // 빈 집합 제거 및 Set을 Array로 변환 (1x 제외)
  // Partial 유틸리티 타입으로 빈 배열은 결과에서 제외
  // <Record<DamageMultiplier, string[]>> 타입으로ㅓ DamageMultiplier를 키로 가진 객체를 만들어서 관리
  const result: Partial<Record<DamageMultiplier, string[]>> = {};
  (Object.keys(damageMultipliers) as (DamageMultiplier | "1x")[]).forEach(
    (key) => {
      if (key !== "1x" && damageMultipliers[key].size > 0) {
        result[key as DamageMultiplier] = Array.from(damageMultipliers[key]);
      }
    },
  );

  return result;
}

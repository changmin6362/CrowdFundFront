"use client";

import TypeLabelGrid from "@/app/components/ui/TypeLabelGrid";
import { usePokemonContext } from "@/app/contexts/PokemonContext";
import convertPokemonTypes from "@/utils/pokemon/convertPokemonTypes";
import calculateWeaknesses from "@/utils/calculateWeaknesses";

export default function PokemonTypeDisplay() {
  // 전역 상태에서 현재 선택된 포켓몬과 업데이트 함수를 가져옴
  const { selectedPokemon } = usePokemonContext();

  // 객체 형태의 데이터를 배열 형태로 변경
  const pokemonTypesArray = convertPokemonTypes(selectedPokemon);

  // 각 포켓몬 타입을 기준으로 약점 타입을 보여줌
  const weaknesses = calculateWeaknesses(pokemonTypesArray);

  return (
    <div className="hide-scrollbar h-[320px] w-full overflow-y-auto p-8">
      <div className="flex flex-col gap-2 p-4">
        <h4>Type</h4>
        <TypeLabelGrid pokemonTypesArray={pokemonTypesArray} />
        <h2>방어 상성(특성 미적용)</h2>
        {Object.entries(weaknesses).map(([multiplier, typeList]) => (
          <div key={multiplier} className="mb-1">
            <h3>{multiplier} damage:</h3>
            <TypeLabelGrid pokemonTypesArray={typeList} />
          </div>
        ))}
      </div>
    </div>
  );
}

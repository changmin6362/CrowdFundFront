import TypeLabelGrid from "@/app/components/ui/typeLabelGrid/";
import convertPokemonTypes from "@/utils/pokemon/convertPokemonTypes";
import calculateWeaknesses from "@/utils/calculateWeaknesses";
import StatsChart from "@/app/components/ui/statsChart";

interface PokemonInfoDisplayProps {
  selectedPokemon: Pokemon | null;
}

export default function PokemonInfoDisplay({
  selectedPokemon,
}: PokemonInfoDisplayProps) {
  // 객체 형태의 데이터를 배열 형태로 변경
  const pokemonTypesArray = convertPokemonTypes(selectedPokemon);

  // 각 포켓몬 타입을 기준으로 약점 타입을 보여줌
  const weaknesses = calculateWeaknesses(pokemonTypesArray);

  return (
    <div className="hide-scrollbar flex h-96 w-full flex-col gap-2 overflow-y-auto">
      <div className="box-section">
        <StatsChart selectedPokemon={selectedPokemon} />
      </div>
      <div className="box-section">
        <h2>타입</h2>
        <TypeLabelGrid pokemonTypesArray={pokemonTypesArray} />
      </div>
      <div className="box-section">
        <h2>방어 상성</h2>
        {Object.entries(weaknesses).map(([multiplier, typeList]) => (
          <div key={multiplier} className="mb-1">
            <h3>{`x${multiplier.slice(0, -1)}`} </h3>
            <TypeLabelGrid pokemonTypesArray={typeList} />
          </div>
        ))}
      </div>
    </div>
  );
}

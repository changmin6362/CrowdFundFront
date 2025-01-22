import translateType from "@/utils/pokemon/translateToKorean";

interface TypeLabelGridProps {
  pokemonTypesArray: string[];
}

export default function TypeLabelGrid({
  pokemonTypesArray,
}: TypeLabelGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {pokemonTypesArray.map((type, index) => {
        // 영문을 한글로 변환
        const translatedType = translateType(type);
        return (
          <div
            key={`type-${index}`}
            className={`box-rounded text-center type-${type.toLowerCase()}`}
          >
            <h3 className="px-2 py-0">{translatedType}</h3>
          </div>
        );
      })}
    </div>
  );
}

interface TypeLabelGridProps {
  pokemonTypesArray: string[];
}

export default function TypeLabelGrid({
  pokemonTypesArray,
}: TypeLabelGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {pokemonTypesArray.map((type, index) => (
        <div
          key={`type-${index}`}
          className={`box-rounded text-center type-${type.toLowerCase()}`}
        >
          <h3 className="px-2 py-0">{type}</h3>
        </div>
      ))}
    </div>
  );
}

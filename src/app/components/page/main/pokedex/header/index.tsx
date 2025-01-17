import PokemonImage from "@/app/components/ui/PokemonImage";
import PokemonSiluette from "@/app/assets/svg/PokemonSilhouette.svg";
import { usePokemonContext } from "@/app/contexts/PokemonContext";

// 페이지의 헤더 부분
export default function Header() {
  const { selectedPokemon } = usePokemonContext();

  const artwork = selectedPokemon
    ? selectedPokemon.sprites.other["official-artwork"].front_default
    : PokemonSiluette;

  return (
    <header className="flex flex-col items-center justify-center pt-8">
      <h1>PokeDex</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="box-rounded bg-striped mb-6">
          <PokemonImage
            imageUrl={artwork}
            imageAlt={"Pokemon official artwork"}
            size={{ width: 208, height: 208 }}
          />
        </div>
      </div>
    </header>
  );
}

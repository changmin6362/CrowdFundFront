import PokemonImage from "@/app/components/PokemonImage";
import POKEBALL from "@/app/assets/svg/Pokeball.svg";

interface PokemonScrollItemProps {
  imageUrl: string | null;
  imageAlt: string;
  infoText: string;
  registerSkeletonRef?: (element: HTMLElement | null) => void;
  registerPokemonRef?: (element: HTMLElement | null) => void;
}

export default function PokemonScrollItem({
  imageUrl,
  imageAlt,
  infoText,
  registerSkeletonRef,
  registerPokemonRef,
}: PokemonScrollItemProps) {
  return (
    <div
      ref={registerSkeletonRef || registerPokemonRef}
      className="box-circle flex min-h-[46px] items-center justify-start"
    >
      <PokemonImage imageUrl={imageUrl || POKEBALL} imageAlt={imageAlt} />
      <h4 className="text-gray-800">{infoText}</h4>
    </div>
  );
}

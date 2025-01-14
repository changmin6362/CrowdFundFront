import Image from "next/image";

interface ImageSize {
  width: number;
  height: number;
}
interface PokemonProps {
  imageUrl: string;
  imageAlt: string;
  size?: ImageSize;
}

export default function PokemonImage({
  imageUrl,
  imageAlt,
  size = { width: 44, height: 44 },
}: PokemonProps) {
  return (
    <Image
      width={size.width}
      height={size.height}
      src={imageUrl}
      alt={imageAlt}
      priority
      className="p-2"
    />
  );
}

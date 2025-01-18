import Image from "next/image";

interface ImageSize {
  width: number;
  height: number;
}
interface SkeletonPokemonImageProps {
  imageUrl: string;
  size?: ImageSize;
}

export default function SkeletonPokemonImage({
  imageUrl,
  size = { width: 44, height: 44 },
}: SkeletonPokemonImageProps) {
  return (
    <Image
      className="animate-pulse p-2"
      style={{ width: size.width, height: size.height }}
      src={imageUrl}
      alt="skeleton pokemon image"
      priority
    />
  );
}

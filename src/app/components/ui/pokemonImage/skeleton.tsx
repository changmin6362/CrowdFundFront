import Image from "next/image";

interface SkeletonPokemonImageProps {
  imageUrl: string;
}

export default function SkeletonPokemonImage({
  imageUrl,
}: SkeletonPokemonImageProps) {
  return (
    <Image
      className="animate-pulse p-2"
      src={imageUrl}
      alt="skeleton pokemon image"
      priority
    />
  );
}

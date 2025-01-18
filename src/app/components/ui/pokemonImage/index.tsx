import Image from "next/image";

import { MAX_IMAGE_SIZE } from "@/constants/pokedexList";

interface ImageSize {
  width: number;
  height: number;
}
interface PokemonProps {
  imageUrl: string;
  imageAlt: string;
  size?: ImageSize;
  onLoad?: () => void;
}

export default function PokemonImage({
  imageUrl,
  imageAlt,
  size = { width: 44, height: 44 },
  onLoad,
}: PokemonProps) {
  return (
    <Image
      className="p-2"
      // pokeapi가 제공하는 가장 큰 사이즈의 사진을 불러오게 해서 동일한 사진에 대한 캐시 사용할 수 있게 함
      width={MAX_IMAGE_SIZE}
      height={MAX_IMAGE_SIZE}
      style={{
        width: size.width,
        height: size.height,
      }}
      src={imageUrl}
      alt={imageAlt}
      onLoad={onLoad}
      priority
    />
  );
}

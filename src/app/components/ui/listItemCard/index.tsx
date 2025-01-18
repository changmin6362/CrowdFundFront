import { useState } from "react";

import PokemonImage from "@/app/components/ui/pokemonImage/";
import SkeletonPokemonImage from "@/app/components/ui/pokemonImage/skeleton";
import POKEBALL from "@/app/assets/svg/Pokeball.svg";

interface ListItemCardProps {
  imageUrl: string | null;
  imageAlt: string;
  infoText: string;
  registerSkeletonRef?: (element: HTMLElement | null) => void;
  registerPokemonRef?: (element: HTMLElement | null) => void;
}

export default function ListItemCard({
  imageUrl,
  imageAlt,
  infoText,
  registerSkeletonRef,
  registerPokemonRef,
}: ListItemCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // img 태그의 onload 이벤트 핸들러로 할당하면, url에서 이미지를 렌더링할 준비가 되었을 때 동작함
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      ref={registerSkeletonRef || registerPokemonRef}
      className="box-circle flex min-h-[46px] items-center justify-start"
    >
      {/* 스켈레톤 이미지 (이미지 로드 전까지 표시) */}
      {!isImageLoaded && <SkeletonPokemonImage imageUrl={POKEBALL} />}
      {/* 실제 이미지 (이미지가 로드 된 이후에 표시) */}
      {imageUrl && (
        <div className={isImageLoaded ? "block" : "hidden"}>
          <PokemonImage
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            onLoad={handleImageLoad}
          />
        </div>
      )}

      <h4 className="text-gray-800">{infoText}</h4>
    </div>
  );
}

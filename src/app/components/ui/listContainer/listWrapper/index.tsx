import ListItemCard from "@/app/components/ui/listItemCard";
import POKEBALL from "@/app/assets/svg/Pokeball.svg";

import { EMPTY_ITEMS_COUNT } from "@/constants/pokedexList";

interface ListWrapperProps {
  children: React.ReactNode;
}

// 여백을 위한 빈 공간 렌더링 (ref 할당 없음)
export default function ListWrapper({ children }: ListWrapperProps) {
  return (
    <>
      {Array(EMPTY_ITEMS_COUNT)
        .fill(null)
        .map((_, index) => (
          <ListItemCard
            key={`empty-space-top-${index}`}
            imageUrl={POKEBALL}
            imageAlt="Empty Slot"
            infoText=""
          />
        ))}
      {children}
      {Array(EMPTY_ITEMS_COUNT)
        .fill(null)
        .map((_, index) => (
          <ListItemCard
            key={`empty-space-bottom-${index}`}
            imageUrl={POKEBALL}
            imageAlt="Empty Slot"
            infoText=""
          />
        ))}
    </>
  );
}

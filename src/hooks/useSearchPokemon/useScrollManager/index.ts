interface useScrollManagerProps {
  scrollToElement: (pokemonId: number) => void;
  resetRefs: () => void;
}

export default function useScrollManager({
  scrollToElement,
  resetRefs,
}: useScrollManagerProps) {
  const navigateToItem = (pokemonId: number) => {
    resetRefs();
    scrollToElement(pokemonId);
  };

  const smartScroll = (pokemonId: number) => {
    requestAnimationFrame(() => {
      scrollToElement(pokemonId);
    });
  };

  return { navigateToItem, smartScroll };
}

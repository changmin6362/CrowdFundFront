import { createContext, useState, useContext } from "react";

interface PokemonContextType {
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

// 컨텍스트 선언
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// 전역 상태를 사용할 수 있게 해주는 Provider
function ContextProvider({ children }: { children: React.ReactNode }) {
  // currentPokemon이 무엇인지 저장하는 state
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

// 전역 상태인 currentPokemon을 컨텍스트에서 가져올 수 있게 해주는 커스텀 훅
function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error(
      "usePokemonContext를 사용하려면 ContextProvider로 감싸야 합니다.",
    );
  }
  return context;
}

export { ContextProvider, usePokemonContext };

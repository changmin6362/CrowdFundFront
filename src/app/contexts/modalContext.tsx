import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

// 컨텍스트 선언
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 전역 상태를 사용할 수 있게 해주는 Provider
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// 전역 상태인 currentPokemon을 컨텍스트에서 가져올 수 있게 해주는 커스텀 훅
export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext를 사용하려면 ModalProvider로 감싸야 합니다.",
    );
  }
  return context;
}

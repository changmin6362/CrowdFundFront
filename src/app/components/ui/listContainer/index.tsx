import { RefObject } from "react";

interface ListContainerProps {
  children: React.ReactNode;
  scrollContainerRef: RefObject<HTMLDivElement>;
  handleScrollFocus: () => void;
}

// 포켓몬 리스트를 감싸는 스크롤 가능한 컨테이너 컴포넌트 렌더링
export default function ListContainer({
  children,
  scrollContainerRef,
  handleScrollFocus,
}: ListContainerProps) {
  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex h-[148px] flex-col gap-1 overflow-y-auto px-8"
        onScroll={handleScrollFocus}
      >
        {children}
      </div>
    </div>
  );
}

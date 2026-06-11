import useSwipeNavigation from "@/hooks/events/useSwipeNavigation";
import { useModalContext } from "@/contexts/modalContext";

interface SwipeContainerProps {
  children: React.ReactNode;
}

export default function SwipeContainer({ children }: SwipeContainerProps) {
  const { isModalOpen } = useModalContext();
  const { combinedRef, swipeProps, transformStyle } = useSwipeNavigation();

  // 모달이 열려있으면 스와이프 비활성화
  const activeSwipeProps = isModalOpen ? {} : swipeProps;

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={combinedRef} {...activeSwipeProps}>
        <div className="flex gap-1" style={transformStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

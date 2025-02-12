import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  elementId?: string;
}

export default function Portal({
  children,
  elementId = "root-portal",
}: PortalProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(elementId);
    // 새 요소 생성 여부 플래그
    let shouldRemove = false;

    if (!element) {
      element = document.createElement("div");
      element.id = elementId;
      document.body.appendChild(element);
      shouldRemove = true;
    }
    setPortalElement(element);

    return () => {
      // 이 컴포넌트에서 새로 추가한 요소면 cleanup 시 제거
      if (shouldRemove && element && document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, [elementId]);

  if (!portalElement) return null;
  return createPortal(children, portalElement);
}

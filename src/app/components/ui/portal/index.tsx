import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: ReactNode }) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 항상 새로운 컨테이너 생성
    const element = document.createElement("div");
    element.id = "crop-portal";

    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!portalElement) return null;
  return createPortal(children, portalElement);
}

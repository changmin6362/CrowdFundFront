import React from "react";
import Portal from "@/app/components/ui/portal";

interface RootModalProps {
  children: React.ReactNode;
  className?: string;
}

export default function RootModal({
  children,
  className = "",
}: RootModalProps) {
  return (
    <Portal>
      <div className="overlay-black">
        <div className={`modal ${className}`}>{children}</div>
      </div>
    </Portal>
  );
}

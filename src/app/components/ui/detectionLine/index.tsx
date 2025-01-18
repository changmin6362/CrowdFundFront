import { forwardRef } from "react";

// 아이템 선택용 감지선 렌더링, forwardRef로 ref 전달
const DetectionLine = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-1/2 h-[1px] bg-transparent"
      style={{ transform: "translateY(-50%)" }}
    />
  );
});

DetectionLine.displayName = "DetectionLine";

export default DetectionLine;

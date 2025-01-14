interface IntersectionCheckParams {
  elementRect: DOMRect;
  detectorRect: DOMRect;
}

// 두 Dom 요소의 교차를 검증하는 함수
export const checkIntersection = ({
  elementRect,
  detectorRect,
}: IntersectionCheckParams): boolean => {
  return (
    elementRect.top <= detectorRect.top &&
    elementRect.bottom >= detectorRect.top
  );
};

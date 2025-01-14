import { useRef, useCallback } from "react";

export default function useRefMap() {
  // 각 아이템에 대한 참조와 id를 저장할 Map 형태의 ref 생성
  const itemRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Map에 새로운 ref를 설정하는 함수
  const setRef = useCallback((id: number, element: HTMLElement | null) => {
    if (element) {
      // element가 존재하면 Map에 저장

      itemRefs.current.set(id, element);
    } else {
      // element가 null이면 Map에서 id를 제거
      itemRefs.current.delete(id);
    }
  }, []);

  // 특정 id에 해당하는 DOM 요소를 Map에서 조회하는 함수
  const getRef = useCallback((id: number) => {
    return itemRefs.current.get(id);
  }, []);

  // Map에 저장된 모든 ref를 초기화하는 함수
  const clearRefs = useCallback(() => {
    itemRefs.current.clear();
  }, []);

  return { itemRefs, setRef, getRef, clearRefs };
}

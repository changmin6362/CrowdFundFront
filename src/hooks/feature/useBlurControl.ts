import { useRef } from "react";

// input 요소의 포커스를 제어하기 위한 커스텀 훅
export default function useBlurControl() {
  // input 요소에 대한 참조를 저장할 ref 생성
  const inputRef = useRef<HTMLInputElement>(null);

  // 포커스 제거 함수
  const handleScrollFocus = () => {
    // inputRef가 존재하고 현재 활성화된 요소가 해당 input인 경우에만 실행
    if (inputRef.current && document.activeElement === inputRef.current) {
      // input 요소의 blur() 메서드를 호출하여 포커스 제거
      inputRef.current.blur();
    }
  };

  // input에 연결할 ref와 포커스 제거 함수를 반환
  return { inputRef, handleScrollFocus };
}

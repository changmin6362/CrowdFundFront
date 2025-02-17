import { useRef, useCallback } from "react";
import { useErrorModalContext } from "@/app/contexts/errorModalContext";
import FetchPokemonList from "@/api/pokemon/fetchPokemonList";

// React Query와 유사한 방식으로 비동기 작업의 로딩 상태를 관리하는 커스텀 훅
export function useLoadingState() {
  const { showError } = useErrorModalContext();

  // Record<string, boolean> 타입으로 문자열 키와 boolean 값을 가진 객체를 정의
  const loadingStateRef = useRef<Record<string, boolean>>({}); // 동기적 체크를 위한 ref

  // 특정 작업의 로딩 시작을 처리하는 함수
  const startLoading = useCallback((key: string) => {
    loadingStateRef.current[key] = true;
  }, []);

  // 특정 작업의 로딩 종료를 처리하는 함수
  const endLoading = useCallback((key: string) => {
    loadingStateRef.current[key] = false;
  }, []);

  // 로딩 상태를 확인하는 함수
  const isLoading = useCallback(
    (key?: string): boolean => {
      // key가 없으면 모든 상태 중 하나라도 로딩 중인지 확인
      if (!key) {
        return Object.values(loadingStateRef).some((state) => state);
      }
      // key가 있으면 해당 작업의 로딩 상태 반환
      return loadingStateRef.current[key] || false;
    },
    [loadingStateRef],
  );

  // 비동기 작업을 로딩 상태와 함께 처리하는 유틸리티 함수
  const withLoading = useCallback(
    async (
      key: string, // 작업 식별자
      operation: () => ReturnType<typeof FetchPokemonList>, // 실행할 비동기 작업
      errorMessage: string, // 에러 발생 시 표시할 메시지
    ) => {
      // 이미 해당 key로 로딩 중인 경우 요청 무시
      if (loadingStateRef.current[key]) {
        return null;
      }

      try {
        startLoading(key); // 작업 시작 시 로딩 상태 활성화
        const result = await operation();
        return result;
      } catch (error) {
        showError(errorMessage, error);
        return null;
      } finally {
        endLoading(key); // 작업 완료 시 로딩 상태 비활성화
      }
    },
    [loadingStateRef, startLoading, showError, endLoading],
  );

  return {
    isLoading: isLoading(),
    withLoading,
  };
}

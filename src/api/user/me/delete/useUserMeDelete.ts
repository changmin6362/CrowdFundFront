import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";

export const useUserMeDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const deleteMe = async (): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: USER_ENDPOINTS.DELETE,
      method: 'DELETE',
    });
    setResponse(res);
    return res;
  };

  const onDelete = async () => {
    if (confirm("정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        await deleteMe();
        alert("회원 탈퇴가 완료되었습니다.");
        window.location.href = "/";
      } catch (err) {
        alert(`탈퇴 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      }
    }
  };

  return {
    onDelete,
    deleteMe,
    isLoading,
    error,
    response,
  };
};

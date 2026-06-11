import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";

export const useProjectDelete = (onSuccess?: () => void) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const onDelete = async (projectId: number) => {
    if (!confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) return;

    try {
      const res = await handleApiCall<void>({
        url: PROJECT_ENDPOINTS.CREATOR.DELETE(projectId),
        method: 'DELETE',
      });
      setResponse(res);
      alert(res.message || '프로젝트가 삭제되었습니다.');
      if (onSuccess) onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로젝트 삭제 중 오류가 발생했습니다.';
      setResponse({ message, data: null, status: 500 });
      alert(message);
    }
  };

  return {
    onDelete,
    isLoading,
    error,
    response,
  };
};

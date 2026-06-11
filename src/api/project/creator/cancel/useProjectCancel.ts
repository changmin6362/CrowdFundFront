import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";

export const useProjectCancel = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const cancelProject = async (projectId: number): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.CANCEL(projectId),
      method: 'PATCH',
    });
    setResponse(res);
    return res;
  };

  return {
    cancelProject,
    isLoading,
    error,
    response,
  };
};

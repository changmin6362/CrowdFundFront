import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";

export const useProjectDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const deleteProject = async (projectId: number): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.DELETE(projectId),
      method: 'DELETE',
    });
    setResponse(res);
    return res;
  };

  return {
    deleteProject,
    isLoading,
    error,
    response,
  };
};

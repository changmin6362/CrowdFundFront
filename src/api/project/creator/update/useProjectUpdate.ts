import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectUpdateRequest } from "@api/project/creator/update/projectUpdateRequest";

export const useProjectUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<void> | null>(null);

  const [request, setRequest] = useState<ProjectUpdateRequest>({
    title: "",
    contentBlocks: {},
  });

  const updateProject = async (projectId: number, data: ProjectUpdateRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: PROJECT_ENDPOINTS.CREATOR.UPDATE(projectId),
      method: 'PATCH',
      data,
    });
  };

  const onSubmit = async (projectId: number) => {
    try {
      const res = await updateProject(projectId, request);
      setResponse(res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResponse({ message, data: null });
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    isLoading,
    error,
    response,
  };
};

import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectCreateRequest } from "@api/project/creator/create/projectCreateRequest";
import { ProjectCreateResponse } from "@api/project/creator/create/projectCreateResponse";

export const useProjectCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectCreateResponse> | null>(null);

  const [request, setRequest] = useState<ProjectCreateRequest>({
    categoryId: 0,
    title: "",
    contentBlocks: {},
    goalAmount: 0,
    endAt: "",
  });

  const createProject = async (data: ProjectCreateRequest): Promise<ApiResult<ProjectCreateResponse>> => {
    return handleApiCall<ProjectCreateResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.CREATE,
      method: 'POST',
      data,
    });
  };

  const onSubmit = async () => {
    try {
      const res = await createProject(request);
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

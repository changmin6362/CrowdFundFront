import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectFetchRequest } from "@api/project/user/fetch/projectFetchRequest";
import { ProjectFetchResponse } from "@api/project/user/fetch/projectFetchResponse";

export const useProjectFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectFetchResponse> | null>(null);

  const [request, setRequest] = useState<ProjectFetchRequest>({});

  const fetchProjects = async (
    query?: ProjectFetchRequest
  ): Promise<ApiResult<ProjectFetchResponse>> => {
    return handleApiCall<ProjectFetchResponse>({
      url: PROJECT_ENDPOINTS.USER.FETCH,
      method: 'GET',
      params: query,
    });
  };

  const onSubmit = async () => {
    try {
      const res = await fetchProjects(request);
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

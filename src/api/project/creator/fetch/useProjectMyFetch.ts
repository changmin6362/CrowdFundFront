import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectMyFetchResponse } from "@api/project/creator/fetch/projectMyFetchResponse";

export const useProjectMyFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectMyFetchResponse> | null>(null);

  const fetchMyProjects = async (): Promise<ApiResult<ProjectMyFetchResponse>> => {
    const res = await handleApiCall<ProjectMyFetchResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.FETCH_ME,
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  return {
    fetchMyProjects,
    isLoading,
    error,
    response,
  };
};

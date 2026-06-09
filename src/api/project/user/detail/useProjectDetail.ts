import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectDetailResponse } from "@api/project/user/detail/projectDetailResponse";

export const useProjectDetail = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectDetailResponse> | null>(null);

  const fetchProjectDetail = async (projectId: number): Promise<ApiResult<ProjectDetailResponse>> => {
    const res = await handleApiCall<ProjectDetailResponse>({
      url: PROJECT_ENDPOINTS.USER.DETAIL(projectId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  return {
    fetchProjectDetail,
    isLoading,
    error,
    response,
  };
};

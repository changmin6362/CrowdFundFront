import { useEffect, useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectDetailResponse } from "@api/project/user/detail/projectDetailResponse";

export const useProjectDetail = (projectId: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectDetailResponse> | null>(null);

  const fetchProjectDetail = async (id: number): Promise<ApiResult<ProjectDetailResponse>> => {
    const res = await handleApiCall<ProjectDetailResponse>({
      url: PROJECT_ENDPOINTS.USER.DETAIL(id),
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetail(projectId);
    }
  }, [projectId]);

  return {
    isLoading,
    error,
    response,
    handleRefresh: () => fetchProjectDetail(projectId),
  };
};

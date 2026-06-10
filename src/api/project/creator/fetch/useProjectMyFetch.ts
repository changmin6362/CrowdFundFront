import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectMyFetchResponse } from "@api/project/creator/fetch/projectMyFetchResponse";

export const useProjectMyFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectMyFetchResponse> | null>(null);

  const fetchMyProjects = useCallback(async (): Promise<ApiResult<ProjectMyFetchResponse>> => {
    try {
      const res = await handleApiCall<ProjectMyFetchResponse>({
        url: PROJECT_ENDPOINTS.CREATOR.FETCH_ME,
        method: 'GET',
      });
      setResponse(res);
      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : '내 프로젝트 목록을 불러오는 중 오류가 발생했습니다.';
      setResponse({ message, data: null });
      throw err;
    }
  }, [handleApiCall]);

  useEffect(() => {
    fetchMyProjects();
  }, [fetchMyProjects]);

  return {
    projects: response?.data?.projects || [],
    isLoading,
    error,
    response,
    handleRefresh: fetchMyProjects,
  };
};

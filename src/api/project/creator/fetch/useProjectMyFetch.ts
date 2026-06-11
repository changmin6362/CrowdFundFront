import { useState, useEffect, useCallback } from "react";
import { ApiResult, CursorRequest } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectMyFetchResponse } from "@api/project/creator/fetch/projectMyFetchResponse";
import { ProjectInfo } from "@api/project/types";

interface UseProjectMyFetchProps {
  limit?: number;
}

export const useProjectMyFetch = (props?: UseProjectMyFetchProps) => {
  const limit = props?.limit;

  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectMyFetchResponse> | null>(null);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  const fetchMyProjects = useCallback(async (
    query?: CursorRequest & { limit?: number },
    isAppend: boolean = false
  ): Promise<ApiResult<ProjectMyFetchResponse>> => {
    const res = await handleApiCall<ProjectMyFetchResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.FETCH_ME,
      method: 'GET',
      params: query,
    });
    setResponse(res);
    if (res.status >= 200 && res.status < 300 && res.data?.projects) {
      setProjects(prev => isAppend ? [...prev, ...res.data!.projects!] : res.data!.projects!);
    } else if (!isAppend) {
      setProjects([]);
    }
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    fetchMyProjects({ limit, id: null, createdAt: null });
  }, [fetchMyProjects, limit]);

  const onLoadMore = useCallback(() => {
    if (response?.data?.hasNext && response?.data?.nextCursor) {
      fetchMyProjects({
        ...response.data.nextCursor,
        limit,
      }, true);
    }
  }, [fetchMyProjects, response, limit]);

  return {
    projects,
    isLoading,
    error,
    response,
    onLoadMore,
    handleRefresh: () => fetchMyProjects({ limit, id: null, createdAt: null }),
  };
};

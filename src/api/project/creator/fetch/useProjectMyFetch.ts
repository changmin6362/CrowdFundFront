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
    try {
      const res = await handleApiCall<ProjectMyFetchResponse>({
        url: PROJECT_ENDPOINTS.CREATOR.FETCH_ME,
        method: 'GET',
        params: query,
      });
      setResponse(res);
      if (res.data?.projects) {
        setProjects(prev => isAppend ? [...prev, ...res.data!.projects!] : res.data!.projects!);
      } else if (!isAppend) {
        setProjects([]);
      }
      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : '내 프로젝트 목록을 불러오는 중 오류가 발생했습니다.';
      const errorRes = { message, data: null };
      setResponse(errorRes);
      if (!isAppend) setProjects([]);
      return errorRes;
    }
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

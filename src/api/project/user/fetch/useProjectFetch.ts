import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectFetchRequest } from "@api/project/user/fetch/projectFetchRequest";
import { ProjectFetchResponse } from "@api/project/user/fetch/projectFetchResponse";
import { ProjectInfo, ProjectStatus } from "@api/project/types";

export const useProjectFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectFetchResponse> | null>(null);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  const [request, setRequest] = useState<ProjectFetchRequest>({
    createdAt: null,
    id: null,
    limit: 10,
  } as ProjectFetchRequest);

  const fetchProjects = useCallback(async (
    query: ProjectFetchRequest,
    isAppend: boolean = false
  ): Promise<ApiResult<ProjectFetchResponse> | null> => {
    try {
      const res = await handleApiCall<ProjectFetchResponse>({
        url: PROJECT_ENDPOINTS.USER.FETCH,
        method: 'GET',
        params: query,
      });
      
      setResponse(res);
      if (res.data) {
        if (isAppend) {
          setProjects(prev => [...prev, ...(res.data?.projects || [])]);
        } else {
          setProjects(res.data.projects || []);
        }
      }
      return res;
    } catch (err: unknown) {
      console.error(err);
      return null;
    }
  }, [handleApiCall]);

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const initialRequest: ProjectFetchRequest = { 
      ...request, 
      createdAt: null, 
      id: null 
    } as ProjectFetchRequest;
    setRequest(initialRequest);
    try {
      await fetchProjects(initialRequest, false);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onLoadMore = async () => {
    const nextCursor = response?.data?.nextCursor;
    if (response?.data?.hasNext && nextCursor) {
      const loadMoreRequest = {
        ...request,
        createdAt: nextCursor.createdAt,
        id: nextCursor.id,
      } as ProjectFetchRequest;
      // setRequest를 하지 않는 이유
      // onLoadMore 함수는 기존에 조회한 데이터에 누적되어야 하는데 setRequest를 사용하여 request 자체를 바꾸면 다음 onSubmit 등에 영향을 줄 수 있음.
      await fetchProjects(loadMoreRequest, true);
    }
  };

  const onCategoryChange = async (categoryId: number | null) => {
    const newRequest = { 
      ...request, 
      categoryId: categoryId || undefined,
      createdAt: null,
      id: null 
    } as ProjectFetchRequest;
    setRequest(newRequest);
    await fetchProjects(newRequest, false);
  };

  const onStatusChange = async (status: ProjectStatus | 'ALL') => {
    const newRequest = { 
      ...request, 
      statuses: status === 'ALL' ? undefined : [status],
      createdAt: null,
      id: null 
    } as ProjectFetchRequest;
    setRequest(newRequest);
    await fetchProjects(newRequest, false);
  };

  const onLimitChange = (limit: number | undefined) => {
    setRequest({ ...request, limit });
  };

  useEffect(() => {
    fetchProjects(request, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    request,
    setRequest,
    onSubmit,
    onLoadMore,
    onCategoryChange,
    onStatusChange,
    onLimitChange,
    fetchProjects,
    isLoading,
    error,
    response,
    projects,
    hasNext: response?.data?.hasNext,
  };
};

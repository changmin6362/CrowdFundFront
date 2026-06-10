import { useEffect, useState, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectShippingFetchResponse } from "@api/project/creator/shipping/projectShippingFetchResponse";

export const useProjectShippingFetch = (projectId?: number) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectShippingFetchResponse> | null>(null);

  const fetchShippingInfos = useCallback(async (id: number): Promise<ApiResult<ProjectShippingFetchResponse>> => {
    const res = await handleApiCall<ProjectShippingFetchResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.SHIPPING_INFOS(id),
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    if (projectId) {
      fetchShippingInfos(projectId);
    }
  }, [projectId, fetchShippingInfos]);

  return {
    fetchShippingInfos,
    isLoading,
    error,
    response,
  };
};

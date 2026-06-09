import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectShippingFetchResponse } from "@api/project/creator/shipping/projectShippingFetchResponse";

export const useProjectShippingFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectShippingFetchResponse> | null>(null);

  const fetchShippingInfos = async (projectId: number): Promise<ApiResult<ProjectShippingFetchResponse>> => {
    const res = await handleApiCall<ProjectShippingFetchResponse>({
      url: PROJECT_ENDPOINTS.CREATOR.SHIPPING_INFOS(projectId),
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  return {
    fetchShippingInfos,
    isLoading,
    error,
    response,
  };
};

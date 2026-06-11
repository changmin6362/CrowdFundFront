import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PLEDGE_ENDPOINTS } from "@api/pledge/constants";
import { MyPledgeCreateRequest, MyPledgeCreateResponse } from "@api/pledge/my/create/myPledgeCreateRequest";

export const useMyPledgeCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<MyPledgeCreateResponse> | null>(null);

  const [request, setRequest] = useState<MyPledgeCreateRequest>({
    projectId: 0,
    rewardId: 0,
  });

  const createPledge = async (data: MyPledgeCreateRequest): Promise<ApiResult<MyPledgeCreateResponse>> => {
    return handleApiCall<MyPledgeCreateResponse>({
      url: PLEDGE_ENDPOINTS.MY.CREATE,
      method: 'POST',
      data,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createPledge(request);
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
    createPledge,
  };
};

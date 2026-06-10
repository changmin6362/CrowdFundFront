import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserMeFetchResponse } from "./userMeFetchResponse";

export const useUserMeFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserMeFetchResponse> | null>(null);

  const fetchMe = useCallback(async (): Promise<ApiResult<UserMeFetchResponse>> => {
    const res = await handleApiCall<UserMeFetchResponse>({
      url: USER_ENDPOINTS.ME,
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return {
    fetchMe,
    isLoading,
    error,
    response,
  };
};

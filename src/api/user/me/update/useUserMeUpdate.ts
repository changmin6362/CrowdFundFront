import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserMeUpdateRequest } from "./userMeUpdateRequest";
import { UserMeUpdateResponse } from "./userMeUpdateResponse";

export const useUserMeUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserMeUpdateResponse> | null>(null);

  const updateMe = async (data: UserMeUpdateRequest): Promise<ApiResult<UserMeUpdateResponse>> => {
    const res = await handleApiCall<UserMeUpdateResponse>({
      url: USER_ENDPOINTS.UPDATE,
      method: 'PUT',
      data,
    });
    setResponse(res);
    return res;
  };

  return {
    updateMe,
    isLoading,
    error,
    response,
  };
};

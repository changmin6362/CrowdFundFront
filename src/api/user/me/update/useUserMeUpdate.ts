import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserMeUpdateRequest } from "./userMeUpdateRequest";
import { UserMeUpdateResponse } from "./userMeUpdateResponse";

export const useUserMeUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserMeUpdateResponse> | null>(null);

  const [request, setRequest] = useState<UserMeUpdateRequest>({
    nickname: "",
    name: "",
    phone: "",
  });

  const updateMe = async (data: UserMeUpdateRequest): Promise<ApiResult<UserMeUpdateResponse>> => {
    return handleApiCall<UserMeUpdateResponse>({
      url: USER_ENDPOINTS.UPDATE,
      method: 'PUT',
      data,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateMe(request);
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
  };
};

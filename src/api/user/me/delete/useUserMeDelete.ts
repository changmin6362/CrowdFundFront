import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";

export const useUserMeDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const deleteMe = async (): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: USER_ENDPOINTS.DELETE,
      method: 'DELETE',
    });
    setResponse(res);
    return res;
  };

  return {
    deleteMe,
    isLoading,
    error,
    response,
  };
};

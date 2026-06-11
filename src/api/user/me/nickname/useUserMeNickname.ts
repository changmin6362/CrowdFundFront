import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserMeNicknameResponse } from "./userMeNicknameResponse";

export const useUserMeNickname = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserMeNicknameResponse> | null>(null);

  const fetchNickname = async (): Promise<ApiResult<UserMeNicknameResponse>> => {
    const res = await handleApiCall<UserMeNicknameResponse>({
      url: USER_ENDPOINTS.NICKNAME,
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  return {
    fetchNickname,
    isLoading,
    error,
    response,
  };
};

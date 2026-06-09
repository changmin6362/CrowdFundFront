import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressSetDefaultResponse } from "@api/user-address/set-default/userAddressSetDefaultResponse";

export const useUserAddressSetDefault = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressSetDefaultResponse> | null>(null);

  const setDefaultAddress = async (id: number): Promise<ApiResult<UserAddressSetDefaultResponse>> => {
    const res = await handleApiCall<UserAddressSetDefaultResponse>({
      url: USER_ADDRESS_ENDPOINTS.SET_DEFAULT(id),
      method: 'PATCH',
    });
    setResponse(res);
    return res;
  };

  return {
    setDefaultAddress,
    isLoading,
    error,
    response,
  };
};

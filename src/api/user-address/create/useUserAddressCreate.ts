import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressCreateRequest } from "@api/user-address/create/userAddressCreateRequest";
import { UserAddressCreateResponse } from "@api/user-address/create/userAddressCreateResponse";

export const useUserAddressCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressCreateResponse> | null>(null);

  const createAddress = async (data: UserAddressCreateRequest): Promise<ApiResult<UserAddressCreateResponse>> => {
    const res = await handleApiCall<UserAddressCreateResponse>({
      url: USER_ADDRESS_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
    setResponse(res);
    return res;
  };

  return {
    createAddress,
    isLoading,
    error,
    response,
  };
};

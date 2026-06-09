import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressFetchResponse } from "@api/user-address/fetch/userAddressFetchResponse";

export const useUserAddressFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressFetchResponse> | null>(null);

  const fetchAddresses = async (): Promise<ApiResult<UserAddressFetchResponse>> => {
    const res = await handleApiCall<UserAddressFetchResponse>({
      url: USER_ADDRESS_ENDPOINTS.LIST,
      method: 'GET',
    });
    setResponse(res);
    return res;
  };

  return {
    fetchAddresses,
    isLoading,
    error,
    response,
  };
};

import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressUpdateRequest } from "@api/user-address/update/userAddressUpdateRequest";
import { UserAddressUpdateResponse } from "@api/user-address/update/userAddressUpdateResponse";

export const useUserAddressUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressUpdateResponse> | null>(null);

  const updateAddress = async (id: number, data: UserAddressUpdateRequest): Promise<ApiResult<UserAddressUpdateResponse>> => {
    const res = await handleApiCall<UserAddressUpdateResponse>({
      url: USER_ADDRESS_ENDPOINTS.UPDATE(id),
      method: 'PATCH',
      data,
    });
    setResponse(res);
    return res;
  };

  return {
    updateAddress,
    isLoading,
    error,
    response,
  };
};

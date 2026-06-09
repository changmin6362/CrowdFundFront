import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";

export const useUserAddressDelete = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<void> | null>(null);

  const deleteAddress = async (id: number): Promise<ApiResult<void>> => {
    const res = await handleApiCall<void>({
      url: USER_ADDRESS_ENDPOINTS.DELETE(id),
      method: 'DELETE',
    });
    setResponse(res);
    return res;
  };

  return {
    deleteAddress,
    isLoading,
    error,
    response,
  };
};

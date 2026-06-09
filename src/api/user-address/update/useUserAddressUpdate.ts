import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressUpdateRequest } from "@api/user-address/update/userAddressUpdateRequest";
import { UserAddressUpdateResponse } from "@api/user-address/update/userAddressUpdateResponse";

export const useUserAddressUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressUpdateResponse> | null>(null);

  const [request, setRequest] = useState<UserAddressUpdateRequest>({
    recipientName: "",
    phone: "",
    postalCode: "",
    addressMain: "",
    addressDetail: "",
  });

  const updateAddress = async (id: number, data: UserAddressUpdateRequest): Promise<ApiResult<UserAddressUpdateResponse>> => {
    return handleApiCall<UserAddressUpdateResponse>({
      url: USER_ADDRESS_ENDPOINTS.UPDATE(id),
      method: 'PATCH',
      data,
    });
  };

  const onSubmit = async (id: number, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await updateAddress(id, request);
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

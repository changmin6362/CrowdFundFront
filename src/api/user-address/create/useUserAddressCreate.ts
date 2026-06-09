import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressCreateRequest } from "@api/user-address/create/userAddressCreateRequest";
import { UserAddressCreateResponse } from "@api/user-address/create/userAddressCreateResponse";

export const useUserAddressCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressCreateResponse> | null>(null);

  const [request, setRequest] = useState<UserAddressCreateRequest>({
    recipientName: "",
    phone: "",
    postalCode: "",
    addressMain: "",
    addressDetail: "",
  });

  const createAddress = async (data: UserAddressCreateRequest): Promise<ApiResult<UserAddressCreateResponse>> => {
    return handleApiCall<UserAddressCreateResponse>({
      url: USER_ADDRESS_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await createAddress(request);
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

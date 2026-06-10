import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressCreateRequest } from "@api/user-address/create/userAddressCreateRequest";
import { UserAddressCreateResponse } from "@api/user-address/create/userAddressCreateResponse";

export const useUserAddressCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressCreateResponse> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<UserAddressCreateRequest>({
    recipientName: "",
    phone: "",
    postalCode: "",
    addressMain: "",
    addressDetail: "",
  });

  const createAddress = async (data: UserAddressCreateRequest): Promise<ApiResult<UserAddressCreateResponse>> => {
    const res = await handleApiCall<UserAddressCreateResponse>({
      url: USER_ADDRESS_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
    setResponse(res);
    return res;
  };

  const onOpen = () => {
    setRequest({
      recipientName: "",
      phone: "",
      postalCode: "",
      addressMain: "",
      addressDetail: "",
    });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    try {
      await createAddress(request);
      alert("새 배송지가 추가되었습니다.");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      alert(`요청 실패: ${err.message}`);
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    onOpen,
    onClose,
    isOpen,
    createAddress,
    isLoading,
    error,
    response,
  };
};

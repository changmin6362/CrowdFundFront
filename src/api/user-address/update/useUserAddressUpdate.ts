import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressUpdateRequest } from "@api/user-address/update/userAddressUpdateRequest";
import { UserAddressUpdateResponse } from "@api/user-address/update/userAddressUpdateResponse";
import { UserAddressInfo } from "../types";

export const useUserAddressUpdate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressUpdateResponse> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [request, setRequest] = useState<UserAddressUpdateRequest>({
    recipientName: "",
    phone: "",
    postalCode: "",
    addressMain: "",
    addressDetail: "",
  });

  const updateAddress = async (id: number, data: UserAddressUpdateRequest): Promise<ApiResult<UserAddressUpdateResponse>> => {
    const res = await handleApiCall<UserAddressUpdateResponse>({
      url: USER_ADDRESS_ENDPOINTS.UPDATE(id),
      method: 'PATCH',
      data,
    });
    setResponse(res);
    return res;
  };

  const onOpen = (address: UserAddressInfo) => {
    if (!address.addressId) return;
    setSelectedId(address.addressId);
    setRequest({
      recipientName: address.recipientName || "",
      phone: address.phone || "",
      postalCode: address.postalCode || "",
      addressMain: address.addressMain || "",
      addressDetail: address.addressDetail || "",
    });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const onSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    if (!selectedId) return;
    try {
      await updateAddress(selectedId, request);
      alert("배송지가 수정되었습니다.");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert(`요청 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    request,
    setRequest,
    handleInputChange,
    onSubmit,
    onOpen,
    onClose,
    isOpen,
    updateAddress,
    isLoading,
    error,
    response,
  };
};

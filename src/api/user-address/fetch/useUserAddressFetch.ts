import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import { UserAddressFetchResponse } from "@api/user-address/fetch/userAddressFetchResponse";

export const useUserAddressFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserAddressFetchResponse> | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const fetchAddresses = useCallback(async (): Promise<ApiResult<UserAddressFetchResponse>> => {
    const res = await handleApiCall<UserAddressFetchResponse>({
      url: USER_ADDRESS_ENDPOINTS.LIST,
      method: 'GET',
    });
    setResponse(res);
    return res;
  }, [handleApiCall]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addresses = response?.data?.addresses || [];

  useEffect(() => {
    if (addresses.length > 0 && selectedAddressId === 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      if (defaultAddr.addressId) {
        setSelectedAddressId(defaultAddr.addressId);
      }
    }
  }, [addresses, selectedAddressId]);

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  return {
    fetchAddresses,
    isLoading,
    error,
    response,
    addresses,
    selectedAddressId,
    handleAddressSelect,
  };
};

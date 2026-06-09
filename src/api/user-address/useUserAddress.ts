import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ADDRESS_ENDPOINTS } from "@api/user-address/constants";
import {
  UserAddressCreateRequest,
  UserAddressCreateResponse,
  UserAddressesFetchResponse,
  UserAddressSetResponse,
  UserAddressUpdateRequest,
  UserAddressUpdateResponse
} from "@api/user-address/types";

export const useUserAddress = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * 내 배송지 목록 조회
   */
  const fetchAddresses = async (): Promise<ApiResult<UserAddressesFetchResponse>> => {
    return handleApiCall<UserAddressesFetchResponse>({
      url: USER_ADDRESS_ENDPOINTS.LIST,
      method: 'GET',
    });
  };

  /**
   * 내 배송지 등록
   */
  const createAddress = async (data: UserAddressCreateRequest): Promise<ApiResult<UserAddressCreateResponse>> => {
    return handleApiCall<UserAddressCreateResponse>({
      url: USER_ADDRESS_ENDPOINTS.CREATE,
      method: 'POST',
      data,
    });
  };

  /**
   * 내 배송지 수정
   */
  const updateAddress = async (id: number, data: UserAddressUpdateRequest): Promise<ApiResult<UserAddressUpdateResponse>> => {
    return handleApiCall<UserAddressUpdateResponse>({
      url: USER_ADDRESS_ENDPOINTS.UPDATE(id),
      method: 'PATCH',
      data,
    });
  };

  /**
   * 내 배송지 삭제
   */
  const deleteAddress = async (id: number): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: USER_ADDRESS_ENDPOINTS.DELETE(id),
      method: 'DELETE',
    });
  };

  /**
   * 기본 배송지 변경
   */
  const setDefaultAddress = async (id: number): Promise<ApiResult<UserAddressSetResponse>> => {
    return handleApiCall<UserAddressSetResponse>({
      url: USER_ADDRESS_ENDPOINTS.SET_DEFAULT(id),
      method: 'PATCH',
    });
  };

  return {
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isLoading,
    error,
  };
};

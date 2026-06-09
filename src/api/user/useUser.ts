import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserFetchResponse, UserUpdateRequest, UserViewResponse } from "@api/user/types";

export const useUser = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * 내 정보 조회
   */
  const fetchMe = async (): Promise<ApiResult<UserFetchResponse>> => {
    return handleApiCall<UserFetchResponse>({
      url: USER_ENDPOINTS.ME,
      method: 'GET',
    });
  };

  /**
   * 내 정보 수정
   */
  const updateMe = async (data: UserUpdateRequest): Promise<ApiResult<UserFetchResponse>> => {
    return handleApiCall<UserFetchResponse>({
      url: USER_ENDPOINTS.UPDATE,
      method: 'PUT',
      data,
    });
  };

  /**
   * 회원 탈퇴
   */
  const deleteMe = async (): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: USER_ENDPOINTS.DELETE,
      method: 'DELETE',
    });
  };

  /**
   * 내 닉네임 조회
   */
  const fetchNickname = async (): Promise<ApiResult<UserViewResponse>> => {
    return handleApiCall<UserViewResponse>({
      url: USER_ENDPOINTS.NICKNAME,
      method: 'GET',
    });
  };

  return {
    fetchMe,
    updateMe,
    deleteMe,
    fetchNickname,
    isLoading,
    error,
  };
};

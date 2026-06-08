import { LoginRequest, LoginResponse, SignUpRequest } from "@api/auth/types";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { AUTH_ENDPOINTS } from "@api/auth/constants";

export const useAuth = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * 회원가입
   */
  const signUp = async (data: SignUpRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>(
      {
        url: AUTH_ENDPOINTS.SIGN_UP,
        method: 'POST',
        data,
      }
    );
  };

  /**
   * 로그인
   */
  const login = async (data: LoginRequest): Promise<ApiResult<LoginResponse>> => {
    const result = await handleApiCall<LoginResponse>(
      {
        url: AUTH_ENDPOINTS.LOGIN,
        method: 'POST',
        data,
      }
    );

    // 성공 시 토큰 저장 로직 (예: localStorage)
    if (result.data?.accessToken) {
      localStorage.setItem('accessToken', result.data.accessToken);
    }

    return result;
  };

  return {
    signUp,
    login,
    isLoading,
    error,
  };
};

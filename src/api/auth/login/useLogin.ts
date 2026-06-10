import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { AUTH_ENDPOINTS } from "@api/auth/constants";
import { LoginRequest } from "@api/auth/login/loginRequest";
import { LoginResponse } from "@api/auth/login/loginResponse";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<LoginResponse> | null>(null);

  const [request, setRequest] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const login = async (data: LoginRequest): Promise<ApiResult<LoginResponse>> => {
    const res = await handleApiCall<LoginResponse>({
      url: AUTH_ENDPOINTS.LOGIN,
      method: "POST",
      data,
    });

    if (res.data?.accessToken) {
      // Middleware에서도 접근할 수 있도록 쿠키에 저장
      Cookies.set("accessToken", res.data.accessToken, { expires: 1 }); // 1일 동안 유지
    }

    return res;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(request);
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

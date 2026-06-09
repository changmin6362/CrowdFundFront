import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { AUTH_ENDPOINTS } from "@api/auth/constants";
import { SignUpRequest } from "@api/auth/signup/signUpRequest";

export const useSignUp = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const [request, setRequest] = useState<SignUpRequest>({
    email: "",
    password: "",
    nickname: "",
    name: "",
    phone: "",
  });

  const signUp = async (data: SignUpRequest): Promise<ApiResult> => {
    return handleApiCall<void>({
      url: AUTH_ENDPOINTS.SIGN_UP,
      method: "POST",
      data,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signUp(request);
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

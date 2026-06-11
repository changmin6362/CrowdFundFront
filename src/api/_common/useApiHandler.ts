import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiResult } from "./types";
import Cookies from "js-cookie";

export const useApiHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(
    config: AxiosRequestConfig
  ): Promise<ApiResult<T>> => {
    setIsLoading(true);
    setError(null);
    try {
      // 쿠키에서 토큰을 확인
      const accessToken = Cookies.get("accessToken");
      const headers = {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };

      const response = await axios({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        ...config,
        headers,
      });

      return {
        ...response.data,
        status: response.status,
      };
    } catch (err) {
      const axiosError = err as AxiosError<ApiResult<unknown>>;
      
      // 401 Unauthorized 에러 처리 (토큰 만료 등)
      if (axiosError.response?.status === 401) {
        Cookies.remove('accessToken', { path: '/' });
        
        // 브라우저 환경에서 즉시 /login으로 리다이렉트하여 사용자 경험 개선
        if (typeof window !== 'undefined') {
           window.location.href = '/login';
        }
      }

      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data as ApiResult<unknown> | undefined;
      const message = responseData?.message || '에러 메시지가 존재하지 않습니다.';
      
      setError(message);
      
      return {
        message,
        data: null,
        status,
      } as ApiResult<T>;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    handleApiCall,
    setError,
  };
};

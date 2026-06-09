import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiResult } from "./types";

export const useApiHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(
    config: AxiosRequestConfig
  ): Promise<ApiResult<T>> => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };

      const response = await axios<ApiResult<T>>({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        ...config,
        headers,
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiResult>;
      const message = axiosError.response?.data?.message || '에러 메시지가 존재하지 않습니다.';
      setError(message);
      throw new Error(message);
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

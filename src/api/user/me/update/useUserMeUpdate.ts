import { useState, useEffect } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { USER_ENDPOINTS } from "@api/user/constants";
import { UserMeUpdateRequest } from "./userMeUpdateRequest";
import { UserMeUpdateResponse } from "./userMeUpdateResponse";
import { UserDataInfo } from "@api/user/types";

export const useUserMeUpdate = (initialData: UserDataInfo | null) => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<UserMeUpdateResponse> | null>(null);
  const [request, setRequest] = useState<UserMeUpdateRequest>({
    nickname: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setRequest({
        nickname: initialData.nickname || "",
        name: initialData.name || "",
        phone: initialData.phone || "",
      });
    }
  }, [initialData]);

  const updateMe = async (data: UserMeUpdateRequest): Promise<ApiResult<UserMeUpdateResponse>> => {
    const res = await handleApiCall<UserMeUpdateResponse>({
      url: USER_ENDPOINTS.UPDATE,
      method: 'PUT',
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    try {
      await updateMe(request);
      alert("프로필이 성공적으로 수정되었습니다.");
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {
    request,
    setRequest,
    onUpdate: onSubmit,
    updateMe,
    isUpdating: isLoading,
    error,
    response,
  };
};

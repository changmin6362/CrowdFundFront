import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryCreateRequest } from "./categoryCreateRequest";
import { CategoryCreateResponse } from "./categoryCreateResponse";

export const useCategoryCreate = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<CategoryCreateResponse> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<CategoryCreateRequest>({
    name: "",
    parentId: null,
  });

  const createCategory = async (data: CategoryCreateRequest): Promise<ApiResult<CategoryCreateResponse>> => {
    const res = await handleApiCall<CategoryCreateResponse>({
      url: CATEGORY_ENDPOINTS.ADMIN.CREATE,
      method: "POST",
      data,
    });
    setResponse(res);
    return res;
  };

  const onOpen = (parentId: number | null = null) => {
    setRequest({ name: "", parentId });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    try {
      await createCategory(request);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    onOpen,
    onClose,
    isOpen,
    createCategory,
    isLoading,
    error,
    response,
  };
};

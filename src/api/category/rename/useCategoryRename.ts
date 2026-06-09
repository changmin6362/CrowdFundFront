import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryRenameRequest } from "./categoryRenameRequest";
import { CategoryTreeNode } from "../types";

export const useCategoryRename = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [request, setRequest] = useState<CategoryRenameRequest>({
    name: "",
  });

  const renameCategory = async (id: number, data: CategoryRenameRequest): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.RENAME(id),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onOpen = (category: CategoryTreeNode) => {
    if (!category.categoryId) return;
    setSelectedId(category.categoryId);
    setRequest({ name: category.name || "" });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const onSubmit = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    if (!selectedId) return;
    try {
      await renameCategory(selectedId, request);
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
    renameCategory,
    isLoading,
    error,
    response,
  };
};

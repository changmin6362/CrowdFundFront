import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryMoveRequest } from "./categoryMoveRequest";
import { CategoryTreeNode } from "../types";

export const useCategoryMove = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [request, setRequest] = useState<CategoryMoveRequest>({
    parentId: null,
  });

  const moveCategory = async (id: number, data: CategoryMoveRequest): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.MOVE(id),
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onOpen = (category: CategoryTreeNode) => {
    if (!category.categoryId) return;
    setSelectedId(category.categoryId);
    setRequest({ parentId: null });
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
      await moveCategory(selectedId, request);
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
    moveCategory,
    isLoading,
    error,
    response,
  };
};

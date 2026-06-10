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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 숫자형 데이터 처리 (parentId)
    if (name === 'parentId') {
      const numValue = value === '' ? null : Number(value);
      setRequest(prev => ({
        ...prev,
        [name]: numValue === null || isNaN(numValue) ? null : numValue,
      }));
      return;
    }

    setRequest(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    request,
    setRequest,
    handleInputChange,
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

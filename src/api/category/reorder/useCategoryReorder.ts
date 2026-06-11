import { useState } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryTreeNode } from "@api/category/types";
import { CategoryReorderRequest } from "./categoryReorderRequest";

export const useCategoryReorder = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const [request, setRequest] = useState<CategoryReorderRequest>({
    categories: [],
  });

  const reorderCategories = async (data: CategoryReorderRequest): Promise<ApiResult> => {
    const res = await handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.REORDER,
      method: "PATCH",
      data,
    });
    setResponse(res);
    return res;
  };

  const onSubmit = async (data: CategoryReorderRequest, onSuccess?: () => void) => {
    try {
      await reorderCategories(data);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onHandleReorder = async (
    category: CategoryTreeNode,
    direction: "up" | "down",
    parentChildren: CategoryTreeNode[],
    onSuccess?: () => void
  ) => {
    if (!category.categoryId) return;
    const index = parentChildren.findIndex(c => c.categoryId === category.categoryId);
    
    let target: CategoryTreeNode | null = null;
    if (direction === "up" && index > 0) {
      target = parentChildren[index - 1];
    } else if (direction === "down" && index < parentChildren.length - 1) {
      target = parentChildren[index + 1];
    }

    if (target && target.categoryId) {
      await onSubmit({
        categories: [
          { categoryId: category.categoryId, sortOrder: target.sortOrder || 0 },
          { categoryId: target.categoryId, sortOrder: category.sortOrder || 0 }
        ]
      }, onSuccess);
    }
  };

  return {
    request,
    setRequest,
    onSubmit,
    onHandleReorder,
    reorderCategories,
    isLoading,
    error,
    response,
  };
};

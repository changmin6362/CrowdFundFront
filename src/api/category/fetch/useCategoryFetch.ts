import { useState, useEffect, useCallback } from "react";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { CategoryFetchResponse } from "./categoryFetchResponse";
import { CategoryTreeNode } from "../types";

export const useCategoryFetch = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>([]);

  const sortCategoryTree = useCallback((tree: CategoryTreeNode[]): CategoryTreeNode[] => {
    return [...tree]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((node) => ({
        ...node,
        children: node.children ? sortCategoryTree(node.children) : [],
      }));
  }, []);

  const fetchCategories = useCallback(async (): Promise<ApiResult<CategoryFetchResponse>> => {
    const res = await handleApiCall<CategoryFetchResponse>({
      url: CATEGORY_ENDPOINTS.USER.FETCH,
      method: "GET",
    });
    if (res.data?.categoryTree) {
      setCategoryTree(sortCategoryTree(res.data.categoryTree));
    }
    return res;
  }, [handleApiCall, sortCategoryTree]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categoryTree,
    fetchCategories,
    isLoading,
    error,
  };
};

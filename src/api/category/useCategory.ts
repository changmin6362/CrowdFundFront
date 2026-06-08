import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { CATEGORY_ENDPOINTS } from "@api/category/constants";
import { UserFetchCategoryResponse } from "@api/category/user/types";
import {
  AdminCategoryActiveRequest,
  AdminCategoryCreateRequest,
  AdminCategoryCreateResponse,
  AdminCategoryMoveRequest,
  AdminCategoryRenameRequest,
  AdminCategoryReorderRequest
} from "@api/category/admin/types";

export const useCategory = () => {
  const { isLoading, error, handleApiCall } = useApiHandler();

  /**
   * [User] 카테고리 트리 조회
   */
  const fetchCategories = async (): Promise<ApiResult<UserFetchCategoryResponse>> => {
    return handleApiCall<UserFetchCategoryResponse>({
      url: CATEGORY_ENDPOINTS.USER.FETCH,
      method: 'GET',
    });
  };

  /**
   * [Admin] 카테고리 생성
   */
  const createCategory = async (data: AdminCategoryCreateRequest): Promise<ApiResult<AdminCategoryCreateResponse>> => {
    return handleApiCall<AdminCategoryCreateResponse>({
      url: CATEGORY_ENDPOINTS.ADMIN.CREATE,
      method: 'POST',
      data,
    });
  };

  /**
   * [Admin] 카테고리 이름 변경
   */
  const renameCategory = async (id: number, data: AdminCategoryRenameRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.RENAME(id),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Admin] 카테고리 이동 (부모 변경)
   */
  const moveCategory = async (id: number, data: AdminCategoryMoveRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.MOVE(id),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Admin] 카테고리 정렬 순서 변경
   */
  const reorderCategories = async (data: AdminCategoryReorderRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.REORDER,
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Admin] 카테고리 활성화/비활성화
   */
  const toggleCategoryActive = async (id: number, data: AdminCategoryActiveRequest): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.ACTIVE(id),
      method: 'PATCH',
      data,
    });
  };

  /**
   * [Admin] 카테고리 삭제
   */
  const deleteCategory = async (id: number): Promise<ApiResult<void>> => {
    return handleApiCall<void>({
      url: CATEGORY_ENDPOINTS.ADMIN.DELETE(id),
      method: 'DELETE',
    });
  };

  return {
    fetchCategories,
    createCategory,
    renameCategory,
    moveCategory,
    reorderCategories,
    toggleCategoryActive,
    deleteCategory,
    isLoading,
    error,
  };
};

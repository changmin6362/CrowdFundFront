import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectCreateRequest } from "@api/project/creator/create/projectCreateRequest";
import { ProjectCreateResponse } from "@api/project/creator/create/projectCreateResponse";
import { ROUTES } from "@/constants/routes";
import { useCategoryFetch } from "@api/category/fetch/useCategoryFetch";
import { CategoryTreeNode } from "@api/category/types";

export const useProjectCreate = () => {
  const router = useRouter();
  const { isLoading: isCreateLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult<ProjectCreateResponse> | null>(null);

  const {
    categoryTree,
    isLoading: isCategoryLoading
  } = useCategoryFetch();

  const [request, setRequest] = useState<ProjectCreateRequest>({
    categoryId: 0,
    title: "",
    contentBlocks: {},
    goalAmount: 0,
    endAt: "",
  });

  // 트리 구조를 평탄화하여 선택창에서 사용
  const categories = useMemo(() => {
    const flattenCategories = (nodes: CategoryTreeNode[], level = 0): { id: number; name: string }[] => {
      let result: { id: number; name: string }[] = [];
      nodes.forEach(node => {
        result.push({ id: node.categoryId ?? 0, name: ('  '.repeat(level) + (node.name ?? '')) });
        if (node.children && node.children.length > 0) {
          result = [...result, ...flattenCategories(node.children, level + 1)];
        }
      });
      return result;
    };
    return flattenCategories(categoryTree);
  }, [categoryTree]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 1. contentBlocks 특수 처리 (객체 형태)
    if (name === 'contentBlocks') {
      setRequest(prev => ({
        ...prev,
        contentBlocks: {
          time: Date.now(),
          blocks: [
            {
              id: "b1",
              type: "paragraph",
              data: { text: value }
            }
          ],
          version: "2.28.2"
        }
      }));
      return; // 처리가 끝났으므로 반환
    }

    // 2. 숫자형 데이터 처리 (categoryId, goalAmount)
    if (name === 'categoryId' || name === 'goalAmount') {
      const numValue = value === '' ? 0 : Number(value);
      setRequest(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
      return;
    }

    // 3. 나머지 문자열 데이터 처리 (title, endAt 등)
    setRequest(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (request.categoryId === 0) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    try {
      const res = await handleApiCall<ProjectCreateResponse>({
        url: PROJECT_ENDPOINTS.CREATOR.CREATE,
        method: 'POST',
        data: request,
      });
      setResponse(res);
      alert(res.message || '프로젝트가 성공적으로 등록되었습니다.');
      router.push(ROUTES.CREATOR.MY_PROJECTS);
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로젝트 등록 중 오류가 발생했습니다.';
      setResponse({ message, data: null });
      alert(message);
    }
  };

  return {
    request,
    setRequest,
    handleInputChange,
    onSubmit,
    isLoading: isCreateLoading,
    isCategoryLoading,
    categories,
    error,
    response,
  };
};

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiResult } from "@api/_common/types";
import { useApiHandler } from "@api/_common/useApiHandler";
import { PROJECT_ENDPOINTS } from "@api/project/constants";
import { ProjectUpdateRequest } from "@api/project/creator/update/projectUpdateRequest";
import { ROUTES } from "@/constants/routes";
import { useProjectDetail } from "@api/project/user/detail/useProjectDetail";

export const useProjectUpdate = (projectId: number) => {
  const router = useRouter();
  const { isLoading, error, handleApiCall } = useApiHandler();
  const [response, setResponse] = useState<ApiResult | null>(null);

  const { response: detailResponse } = useProjectDetail(projectId);

  const [request, setRequest] = useState<ProjectUpdateRequest>({
    title: "",
    contentBlocks: {},
  });

  useEffect(() => {
    if (detailResponse?.data?.projectDetail) {
      const { title, contentBlocks } = detailResponse.data.projectDetail;
      
      // 만약 contentBlocks가 단순 텍스트 형식이 아니라 객체 형식이면, 
      // 그 안에서 텍스트를 추출하거나 그대로 사용합니다.
      // 일단 handleInputChange에서 만드는 구조와 호환되도록 처리합니다.
      setRequest({
        title: title || "",
        contentBlocks: contentBlocks || {},
      });
    }
  }, [detailResponse]);

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

    // 2. 나머지 문자열 데이터 처리 (title 등)
    setRequest(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      const res = await handleApiCall<void>({
        url: PROJECT_ENDPOINTS.CREATOR.UPDATE(projectId),
        method: 'PATCH',
        data: request,
      });
      setResponse(res);
      alert(res.message || '프로젝트가 성공적으로 수정되었습니다.');
      router.push(ROUTES.CREATOR.MY_PROJECTS);
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로젝트 수정 중 오류가 발생했습니다.';
      setResponse({ message, data: null, status: 500 });
      alert(message);
    }
  };

  return {
    request,
    setRequest,
    handleInputChange,
    onSubmit,
    isLoading,
    error,
    response,
    projectDetail: detailResponse?.data?.projectDetail,
  };
};

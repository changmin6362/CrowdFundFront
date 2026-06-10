"use client";

import { useProjectFetch } from "@api/project/user/fetch/useProjectFetch";
import { useCategoryFetch } from "@api/category/fetch/useCategoryFetch";
import { ProjectStatus } from "@api/project/types";

export default function ProjectListPage() {
  const { 
    request, 
    onSubmit,
    onLoadMore,
    onCategoryChange,
    onStatusChange,
    onLimitChange,
    isLoading, 
    projects,
    hasNext
  } = useProjectFetch();
  
  const { categoryTree } = useCategoryFetch();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">프로젝트 탐색</h1>

      {/* 필터 영역 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select 
          className="border rounded p-2"
          value={request.categoryId || ""}
          onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">모든 카테고리</option>
          {categoryTree.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>

        <select 
          className="border rounded p-2"
          value={request.statuses?.[0] || "ALL"}
          onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'ALL')}
        >
          <option value="ALL">모든 상태</option>
          <option value="ONGOING">진행 중</option>
          <option value="COMPLETED">종료됨</option>
          <option value="CANCELED">취소됨</option>
        </select>

        <form onSubmit={onSubmit} className="flex gap-2">
          <input 
            type="number"
            placeholder="Limit"
            className="border rounded p-2 w-20"
            value={request.limit || ""}
            onChange={(e) => onLimitChange(e.target.value ? Number(e.target.value) : undefined)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            검색
          </button>
        </form>
      </div>

      {/* 리스트 영역 */}
      {isLoading && projects.length === 0 ? (
        <p>로딩 중...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border rounded-lg text-gray-500">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.projectId} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">이미지 준비 중</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded">
                    {project.status}
                  </span>
                </div>
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{project.title}</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>목표: {project.goalAmount?.toLocaleString()}원</p>
                  <p className="text-blue-600 font-bold">
                    현재: {project.currentAmount?.toLocaleString()}원 
                    ({Math.round(((project.currentAmount || 0) / (project.goalAmount || 1)) * 100)}%)
                  </p>
                  <p>종료: {project.endAt ? new Date(project.endAt).toLocaleDateString() : "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 더보기 버튼 */}
      {hasNext && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="border px-8 py-2 rounded-full hover:bg-gray-50 disabled:bg-gray-100"
          >
            {isLoading ? "로딩 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
}

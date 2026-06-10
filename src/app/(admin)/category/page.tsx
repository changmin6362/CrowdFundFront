"use client";

import { useCategoryFetch } from "@api/category/fetch/useCategoryFetch";
import { useCategoryCreate } from "@api/category/create/useCategoryCreate";
import { useCategoryRename } from "@api/category/rename/useCategoryRename";
import { useCategoryMove } from "@api/category/move/useCategoryMove";
import { useCategoryDelete } from "@api/category/delete/useCategoryDelete";
import { useCategoryActive } from "@api/category/active/useCategoryActive";
import { useCategoryReorder } from "@api/category/reorder/useCategoryReorder";
import { CategoryTreeNode } from "@api/category/types";

export default function AdminCategoryPage() {
  const { categoryTree, fetchCategories, isLoading: isFetching } = useCategoryFetch();
  
  const createHook = useCategoryCreate();
  const renameHook = useCategoryRename();
  const moveHook = useCategoryMove();
  const deleteHook = useCategoryDelete();
  const activeHook = useCategoryActive();
  const reorderHook = useCategoryReorder();

  const handleRefresh = () => fetchCategories();

  const CategoryItem = ({ category, parentChildren }: { category: CategoryTreeNode, parentChildren: CategoryTreeNode[] }) => (
    <div className="ml-4 border-l pl-4 my-2">
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
        <div className="flex items-center gap-2">
          <span className="font-medium">{category.name}</span>
          <span className="text-xs text-gray-400">ID: {category.categoryId}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => {
              if (category.categoryId) {
                createHook.onOpen(category.categoryId);
              }
            }} 
            className="p-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            하위추가
          </button>
          <button 
            onClick={() => renameHook.onOpen(category)} 
            className="p-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            이름수정
          </button>
          <button 
            onClick={() => moveHook.onOpen(category)} 
            className="p-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            이동
          </button>
          <button 
            onClick={() => {
              if (category.categoryId) {
                activeHook.onToggle(category.categoryId, !!category.depth, handleRefresh);
              }
            }} 
            className="p-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
          >
            토글
          </button>
          <button 
            onClick={() => reorderHook.onHandleReorder(category, "up", parentChildren, handleRefresh)} 
            className="p-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            ↑
          </button>
          <button 
            onClick={() => reorderHook.onHandleReorder(category, "down", parentChildren, handleRefresh)} 
            className="p-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            ↓
          </button>
          <button 
            onClick={() => {
              if (category.categoryId) {
                deleteHook.onDelete(category.categoryId, handleRefresh);
              }
            }} 
            className="p-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            삭제
          </button>
        </div>
      </div>
      {category.children && category.children.length > 0 && (
        <div className="mt-1">
          {category.children.map((child) => (
            <CategoryItem key={child.categoryId} category={child} parentChildren={category.children!} />
          ))}
        </div>
      )}
    </div>
  );

  const isModalOpen = createHook.isOpen || renameHook.isOpen || moveHook.isOpen;
  const isActionLoading = createHook.isLoading || renameHook.isLoading || moveHook.isLoading || deleteHook.isLoading || activeHook.isLoading || reorderHook.isLoading;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">관리자 카테고리 관리</h1>
        <button
          onClick={() => createHook.onOpen(null)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          최상위 카테고리 추가
        </button>
      </div>

      {isFetching ? (
        <p>로딩 중...</p>
      ) : categoryTree.length === 0 ? (
        <p className="text-gray-500 text-center py-10 border rounded-lg">등록된 카테고리가 없습니다.</p>
      ) : (
        <div className="border rounded-lg p-4 bg-white">
          {categoryTree.map((category) => (
            <CategoryItem key={category.categoryId} category={category} parentChildren={categoryTree} />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {createHook.isOpen ? "카테고리 추가" : renameHook.isOpen ? "이름 수정" : "카테고리 이동"}
            </h2>
            
            {createHook.isOpen && (
              <form onSubmit={(e) => createHook.onSubmit(e, handleRefresh)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">카테고리 이름</label>
                  <input
                    type="text"
                    name="name"
                    value={createHook.request.name}
                    onChange={createHook.handleInputChange}
                    className="w-full border rounded p-2"
                    required
                    minLength={2}
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    부모 카테고리 ID (비워두면 최상위)
                  </label>
                  <input
                    type="number"
                    name="parentId"
                    value={createHook.request.parentId ?? ""}
                    onChange={createHook.handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="ID 입력"
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="button" onClick={createHook.onClose} className="flex-1 border py-2 rounded hover:bg-gray-50">취소</button>
                  <button type="submit" disabled={isActionLoading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
                    {isActionLoading ? "처리 중..." : "확인"}
                  </button>
                </div>
              </form>
            )}

            {renameHook.isOpen && (
              <form onSubmit={(e) => renameHook.onSubmit(e, handleRefresh)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">카테고리 이름</label>
                  <input
                    type="text"
                    name="name"
                    value={renameHook.request.name}
                    onChange={renameHook.handleInputChange}
                    className="w-full border rounded p-2"
                    required
                    minLength={2}
                    maxLength={20}
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="button" onClick={renameHook.onClose} className="flex-1 border py-2 rounded hover:bg-gray-50">취소</button>
                  <button type="submit" disabled={isActionLoading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
                    {isActionLoading ? "처리 중..." : "확인"}
                  </button>
                </div>
              </form>
            )}

            {moveHook.isOpen && (
              <form onSubmit={(e) => moveHook.onSubmit(e, handleRefresh)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    새 부모 카테고리 ID (비워두면 최상위)
                  </label>
                  <input
                    type="number"
                    name="parentId"
                    value={moveHook.request.parentId ?? ""}
                    onChange={moveHook.handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="ID 입력"
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="button" onClick={moveHook.onClose} className="flex-1 border py-2 rounded hover:bg-gray-50">취소</button>
                  <button type="submit" disabled={isActionLoading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
                    {isActionLoading ? "처리 중..." : "확인"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

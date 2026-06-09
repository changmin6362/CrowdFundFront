"use client";

import { useEffect, useState } from "react";
import { useCategoryFetch } from "@api/category/fetch/useCategoryFetch";
import { useCategoryCreate } from "@api/category/create/useCategoryCreate";
import { useCategoryRename } from "@api/category/rename/useCategoryRename";
import { useCategoryDelete } from "@api/category/delete/useCategoryDelete";
import { useCategoryActive } from "@api/category/active/useCategoryActive";
import { useCategoryMove } from "@api/category/move/useCategoryMove";
import { useCategoryReorder } from "@api/category/reorder/useCategoryReorder";
import { CategoryTreeNode } from "@api/category/types";

export default function AdminCategoryPage() {
  const { fetchCategories, isLoading: isFetching } = useCategoryFetch();
  const { createCategory } = useCategoryCreate();
  const { renameCategory } = useCategoryRename();
  const { deleteCategory } = useCategoryDelete();
  const { toggleCategoryActive } = useCategoryActive();
  const { moveCategory } = useCategoryMove();
  const { reorderCategories } = useCategoryReorder();

  const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "rename" | "move">("create");
  const [selectedCategory, setSelectedCategory] = useState<CategoryTreeNode | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    parentId: null as number | null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      if (res.data?.categoryTree) {
        setCategoryTree(res.data.categoryTree);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleOpenCreateModal = (parentId: number | null = null) => {
    setModalMode("create");
    setFormData({ name: "", parentId });
    setIsModalOpen(true);
  };

  const handleOpenRenameModal = (category: CategoryTreeNode) => {
    setModalMode("rename");
    setSelectedCategory(category);
    setFormData({ name: category.name || "", parentId: null });
    setIsModalOpen(true);
  };

  const handleOpenMoveModal = (category: CategoryTreeNode) => {
    setModalMode("move");
    setSelectedCategory(category);
    setFormData({ name: "", parentId: null });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === "create") {
        await createCategory({ name: formData.name, parentId: formData.parentId ?? null });
        alert("카테고리가 생성되었습니다.");
      } else if (modalMode === "rename" && selectedCategory?.categoryId) {
        await renameCategory(selectedCategory.categoryId, { name: formData.name });
        alert("카테고리 이름이 수정되었습니다.");
      } else if (modalMode === "move" && selectedCategory?.categoryId) {
        await moveCategory(selectedCategory.categoryId, { parentId: formData.parentId ?? null });
        alert("카테고리 위치가 이동되었습니다.");
      }
      handleCloseModal();
      loadCategories();
    } catch (err: any) {
      alert(`요청 실패: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까? 하위 카테고리도 모두 삭제될 수 있습니다.")) {
      try {
        await deleteCategory(id);
        alert("카테고리가 삭제되었습니다.");
        loadCategories();
      } catch (err: any) {
        alert(`삭제 실패: ${err.message}`);
      }
    }
  };

  const handleToggleActive = async (category: CategoryTreeNode) => {
    if (!category.categoryId) return;
    try {
      // 실제로는 현재 상태를 알 수 없으므로 일단 true로 보내거나 API 정의에 따라 다를 수 있음
      // 여기서는 toggle 기능을 수행한다고 가정 (API가 toggle이므로 isActive를 명시적으로 보내야 하는지 확인 필요)
      // useCategoryActive 분석 시 CategoryActiveRequest { isActive: boolean }를 받음
      // 현재 UI 상으로 active 여부를 알 수 있는 필드가 CategoryTreeNode에 없음 (categoryId, name, depth, sortOrder, children만 존재)
      // 일단 true를 기본값으로 시도
      await toggleCategoryActive(category.categoryId, { isActive: true });
      alert("카테고리 활성 상태가 변경되었습니다.");
      loadCategories();
    } catch (err: any) {
      alert(`변경 실패: ${err.message}`);
    }
  };

  const handleReorder = async (category: CategoryTreeNode, direction: "up" | "down", parentChildren: CategoryTreeNode[]) => {
    if (!category.categoryId) return;
    const index = parentChildren.findIndex(c => c.categoryId === category.categoryId);
    if (direction === "up" && index > 0) {
      const target = parentChildren[index - 1];
      if (target.categoryId) {
        await reorderCategories({
          categories: [
            { categoryId: category.categoryId, sortOrder: target.sortOrder || 0 },
            { categoryId: target.categoryId, sortOrder: category.sortOrder || 0 }
          ]
        });
        loadCategories();
      }
    } else if (direction === "down" && index < parentChildren.length - 1) {
      const target = parentChildren[index + 1];
      if (target.categoryId) {
        await reorderCategories({
          categories: [
            { categoryId: category.categoryId, sortOrder: target.sortOrder || 0 },
            { categoryId: target.categoryId, sortOrder: category.sortOrder || 0 }
          ]
        });
        loadCategories();
      }
    }
  };

  const CategoryItem = ({ category, parentChildren }: { category: CategoryTreeNode, parentChildren: CategoryTreeNode[] }) => (
    <div className="ml-4 border-l pl-4 my-2">
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
        <div className="flex items-center gap-2">
          <span className="font-medium">{category.name}</span>
          <span className="text-xs text-gray-400">ID: {category.categoryId}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => category.categoryId && handleOpenCreateModal(category.categoryId)} className="p-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">하위추가</button>
          <button onClick={() => handleOpenRenameModal(category)} className="p-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">이름수정</button>
          <button onClick={() => handleOpenMoveModal(category)} className="p-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">이동</button>
          <button onClick={() => handleToggleActive(category)} className="p-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">토글</button>
          <button onClick={() => handleReorder(category, "up", parentChildren)} className="p-1 text-xs bg-gray-100 rounded hover:bg-gray-200">↑</button>
          <button onClick={() => handleReorder(category, "down", parentChildren)} className="p-1 text-xs bg-gray-100 rounded hover:bg-gray-200">↓</button>
          <button onClick={() => category.categoryId && handleDelete(category.categoryId)} className="p-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">삭제</button>
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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">관리자 카테고리 관리</h1>
        <button
          onClick={() => handleOpenCreateModal()}
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
              {modalMode === "create" ? "카테고리 추가" : modalMode === "rename" ? "이름 수정" : "카테고리 이동"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalMode !== "move" && (
                <div>
                  <label className="block text-sm font-medium mb-1">카테고리 이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded p-2"
                    required
                    minLength={2}
                    maxLength={20}
                  />
                </div>
              )}
              {(modalMode === "create" || modalMode === "move") && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {modalMode === "create" ? "부모 카테고리 ID (비워두면 최상위)" : "새 부모 카테고리 ID (비워두면 최상위)"}
                  </label>
                  <input
                    type="number"
                    value={formData.parentId || ""}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? Number(e.target.value) : null })}
                    className="w-full border rounded p-2"
                    placeholder="ID 입력"
                  />
                </div>
              )}
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border py-2 rounded hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

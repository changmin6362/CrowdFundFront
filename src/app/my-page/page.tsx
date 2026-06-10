"use client";

import { useUserMeFetch } from "@api/user/me/fetch/useUserMeFetch";
import { useUserMeUpdate } from "@api/user/me/update/useUserMeUpdate";
import { useUserMeDelete } from "@api/user/me/delete/useUserMeDelete";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function MyPage() {
  const { fetchMe, response: fetchResponse, isLoading: isFetching } = useUserMeFetch();
  const user = fetchResponse?.data?.user || null;
  const { 
    request, 
    handleInputChange,
    onUpdate, 
    isUpdating,
    error: updateError,
    response: updateResponse
  } = useUserMeUpdate(user);
  const { 
    onDelete, 
    isLoading: isDeleting,
    response: deleteResponse
  } = useUserMeDelete();

  if (isFetching && !user) return <div className="p-8">로딩 중...</div>;

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">마이페이지 (프로필 관리)</h1>
      
      <div className="mb-6 pb-6 border-b space-y-2">
        <h2 className="text-lg font-semibold mb-2">기본 정보</h2>
        <p className="text-gray-600">이메일: {user?.email || "불러오는 중..."}</p>
        <p className="text-gray-600">역할: {user?.role || "불러오는 중..."}</p>
        <div className="pt-2 flex flex-col gap-2">
          <Link href={ROUTES.MY_PAGE_PLEDGES} className="text-blue-600 hover:underline font-medium text-sm">
            내 후원 내역 보러가기 →
          </Link>
          <Link href={ROUTES.MY_PAGE_ADDRESS} className="text-blue-600 hover:underline font-medium text-sm">
            배송지 관리 →
          </Link>
        </div>
      </div>

      <form onSubmit={(e) => onUpdate(e, fetchMe)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={request.nickname}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            value={request.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">전화번호</label>
          <input
            type="text"
            name="phone"
            value={request.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isUpdating ? "수정 중..." : "정보 수정"}
        </button>
      </form>

      {updateResponse?.message && (
        <p className="mt-4 text-center text-green-600 font-medium">
          {updateResponse.message}
        </p>
      )}

      {updateError && (
        <p className="mt-4 text-center text-red-500">
          수정 실패: {updateError}
        </p>
      )}

      <div className="mt-10 pt-6 border-t">
        {deleteResponse?.message && (
          <p className="mb-4 text-center text-green-600 font-medium">
            {deleteResponse.message}
          </p>
        )}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full bg-red-100 text-red-600 font-bold py-2 px-4 rounded hover:bg-red-200 disabled:bg-red-50"
        >
          {isDeleting ? "처리 중..." : "회원 탈퇴"}
        </button>
      </div>
    </div>
  );
}

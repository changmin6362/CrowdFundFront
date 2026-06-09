"use client";

import { useEffect, useState } from "react";
import { useUserMeFetch } from "@api/user/me/fetch/useUserMeFetch";
import { useUserMeUpdate } from "@api/user/me/update/useUserMeUpdate";
import { useUserMeDelete } from "@api/user/me/delete/useUserMeDelete";
import { UserMeUpdateRequest } from "@api/user/me/update/userMeUpdateRequest";

export default function MyPage() {
  const { fetchMe, isLoading: isFetching, response: fetchResponse } = useUserMeFetch();
  const { updateMe, isLoading: isUpdating } = useUserMeUpdate();
  const { deleteMe, isLoading: isDeleting } = useUserMeDelete();

  const [formData, setFormData] = useState<UserMeUpdateRequest>({
    nickname: "",
    name: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await fetchMe();
      if (res.data?.user) {
        setFormData({
          nickname: res.data.user.nickname || "",
          name: res.data.user.name || "",
          phone: res.data.user.phone || "",
        });
      }
    } catch (err: any) {
      console.error("Failed to load user data:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await updateMe(formData);
      if (res.data) {
        setMessage("프로필이 성공적으로 수정되었습니다.");
        loadUserData();
      }
    } catch (err: any) {
      setMessage(`수정 실패: ${err.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        await deleteMe();
        alert("회원 탈퇴가 완료되었습니다.");
        window.location.href = "/";
      } catch (err: any) {
        alert(`탈퇴 실패: ${err.message}`);
      }
    }
  };

  if (isFetching) return <div className="p-8">로딩 중...</div>;

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">마이페이지 (프로필 관리)</h1>
      
      <div className="mb-6 pb-6 border-b">
        <h2 className="text-lg font-semibold mb-2">기본 정보</h2>
        <p className="text-gray-600">이메일: {fetchResponse?.data?.user?.email || "불러오는 중..."}</p>
        <p className="text-gray-600">역할: {fetchResponse?.data?.user?.role || "불러오는 중..."}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
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
            value={formData.name}
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
            value={formData.phone}
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

      {message && (
        <p className={`mt-4 text-center ${message.includes("실패") ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <div className="mt-10 pt-6 border-t">
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="w-full bg-red-100 text-red-600 font-bold py-2 px-4 rounded hover:bg-red-200 disabled:bg-red-50"
        >
          {isDeleting ? "처리 중..." : "회원 탈퇴"}
        </button>
      </div>
    </div>
  );
}

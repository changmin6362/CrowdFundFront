"use client";

import { useEffect, useState } from "react";
import { useUserAddressFetch } from "@api/user-address/fetch/useUserAddressFetch";
import { useUserAddressCreate } from "@api/user-address/create/useUserAddressCreate";
import { useUserAddressUpdate } from "@api/user-address/update/useUserAddressUpdate";
import { useUserAddressDelete } from "@api/user-address/delete/useUserAddressDelete";
import { useUserAddressSetDefault } from "@api/user-address/set-default/useUserAddressSetDefault";
import { UserAddressInfo } from "@api/user-address/types";

export default function AddressPage() {
  const { fetchAddresses, isLoading: isFetching, response: fetchResponse } = useUserAddressFetch();
  const { createAddress, isLoading: isCreating } = useUserAddressCreate();
  const { updateAddress, isLoading: isUpdating } = useUserAddressUpdate();
  const { deleteAddress, isLoading: isDeleting } = useUserAddressDelete();
  const { setDefaultAddress, isLoading: isSettingDefault } = useUserAddressSetDefault();

  const [addresses, setAddresses] = useState<UserAddressInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddressInfo | null>(null);
  const [formData, setFormData] = useState({
    recipientName: "",
    phone: "",
    postalCode: "",
    addressMain: "",
    addressDetail: "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const res = await fetchAddresses();
      if (res.data?.addresses) {
        setAddresses(res.data.addresses);
      } else {
        setAddresses([]);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setAddresses([]);
    }
  };

  const handleOpenModal = (address?: UserAddressInfo) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        recipientName: address.recipientName || "",
        phone: address.phone || "",
        postalCode: address.postalCode || "",
        addressMain: address.addressMain || "",
        addressDetail: address.addressDetail || "",
      });
    } else {
      setEditingAddress(null);
      setFormData({
        recipientName: "",
        phone: "",
        postalCode: "",
        addressMain: "",
        addressDetail: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddress?.addressId) {
        await updateAddress(editingAddress.addressId, formData);
        alert("배송지가 수정되었습니다.");
      } else {
        await createAddress(formData);
        alert("새 배송지가 추가되었습니다.");
      }
      handleCloseModal();
      loadAddresses();
    } catch (err: any) {
      alert(`요청 실패: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말로 이 배송지를 삭제하시겠습니까?")) {
      try {
        await deleteAddress(id);
        alert("배송지가 삭제되었습니다.");
        loadAddresses();
      } catch (err: any) {
        alert(`삭제 실패: ${err.message}`);
      }
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id);
      alert("기본 배송지로 설정되었습니다.");
      loadAddresses();
    } catch (err: any) {
      alert(`설정 실패: ${err.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">배송지 관리</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          새 배송지 추가
        </button>
      </div>

      {isFetching ? (
        <p>로딩 중...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500 text-center py-10 border rounded-lg">등록된 배송지가 없습니다.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr.addressId} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{addr.recipientName}</span>
                  {addr.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">기본배송지</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm mt-2">
                  ({addr.postalCode}) {addr.addressMain} {addr.addressDetail}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(addr)}
                    className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => addr.addressId && handleDelete(addr.addressId)}
                    className="text-sm border px-3 py-1 rounded text-red-500 hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
                {!addr.isDefault && (
                  <button
                    onClick={() => addr.addressId && handleSetDefault(addr.addressId)}
                    disabled={isSettingDefault}
                    className="text-xs border px-3 py-1 rounded hover:bg-gray-50"
                  >
                    기본 배송지로 설정
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingAddress ? "배송지 수정" : "새 배송지 추가"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">수령인</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">연락처</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">우편번호</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">주소</label>
                <input
                  type="text"
                  name="addressMain"
                  value={formData.addressMain}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">상세주소</label>
                <input
                  type="text"
                  name="addressDetail"
                  value={formData.addressDetail}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
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
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isCreating || isUpdating ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

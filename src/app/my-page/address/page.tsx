"use client";

import { useUserAddressFetch } from "@api/user-address/fetch/useUserAddressFetch";
import { useUserAddressCreate } from "@api/user-address/create/useUserAddressCreate";
import { useUserAddressUpdate } from "@api/user-address/update/useUserAddressUpdate";
import { useUserAddressDelete } from "@api/user-address/delete/useUserAddressDelete";
import { useUserAddressSetDefault } from "@api/user-address/set-default/useUserAddressSetDefault";

export default function AddressPage() {
  const { fetchAddresses, isLoading: isFetching, response: fetchResponse } = useUserAddressFetch();
  const createHook = useUserAddressCreate();
  const updateHook = useUserAddressUpdate();
  const deleteHook = useUserAddressDelete();
  const setDefaultHook = useUserAddressSetDefault();

  const addresses = fetchResponse?.data?.addresses || [];
  const handleRefresh = () => fetchAddresses();

  const isModalOpen = createHook.isOpen || updateHook.isOpen;
  const isActionLoading = createHook.isLoading || updateHook.isLoading;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">배송지 관리</h1>
        <button
          onClick={createHook.onOpen}
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
                    onClick={() => updateHook.onOpen(addr)}
                    className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      if (addr.addressId) {
                        deleteHook.onDelete(addr.addressId, handleRefresh);
                      }
                    }}
                    className="text-sm border px-3 py-1 rounded text-red-500 hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
                {!addr.isDefault && (
                  <button
                    onClick={() => {
                      if (addr.addressId) {
                        setDefaultHook.onSetDefault(addr.addressId, handleRefresh);
                      }
                    }}
                    disabled={setDefaultHook.isLoading}
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
              {createHook.isOpen ? "새 배송지 추가" : "배송지 수정"}
            </h2>
            <form 
              onSubmit={(e) => createHook.isOpen ? createHook.onSubmit(e, handleRefresh) : updateHook.onSubmit(e, handleRefresh)} 
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">수령인</label>
                <input
                  type="text"
                  name="recipientName"
                  value={createHook.isOpen ? createHook.request.recipientName : updateHook.request.recipientName}
                  onChange={createHook.isOpen ? createHook.handleInputChange : updateHook.handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">연락처</label>
                <input
                  type="text"
                  name="phone"
                  value={createHook.isOpen ? createHook.request.phone : updateHook.request.phone}
                  onChange={createHook.isOpen ? createHook.handleInputChange : updateHook.handleInputChange}
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
                  value={createHook.isOpen ? createHook.request.postalCode : updateHook.request.postalCode}
                  onChange={createHook.isOpen ? createHook.handleInputChange : updateHook.handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">주소</label>
                <input
                  type="text"
                  name="addressMain"
                  value={createHook.isOpen ? createHook.request.addressMain : updateHook.request.addressMain}
                  onChange={createHook.isOpen ? createHook.handleInputChange : updateHook.handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">상세주소</label>
                <input
                  type="text"
                  name="addressDetail"
                  value={createHook.isOpen ? createHook.request.addressDetail : updateHook.request.addressDetail}
                  onChange={createHook.isOpen ? createHook.handleInputChange : updateHook.handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={createHook.isOpen ? createHook.onClose : updateHook.onClose}
                  className="flex-1 border py-2 rounded hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isActionLoading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isActionLoading ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

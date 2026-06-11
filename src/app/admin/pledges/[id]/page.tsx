"use client";

import React, { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAdminPledgeDetail } from "@api/pledge/admin/detail/useAdminPledgeDetail";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function AdminPledgeDetailPage() {
  const params = useParams();
  const pledgeId = params?.id ? Number(params.id) : 0;

  const { fetchAdminPledgeDetail, response, isLoading } =
    useAdminPledgeDetail(pledgeId);

  const detail = response?.data?.adminPledgeDetail;

  const loadDetail = useCallback(async () => {
    if (!pledgeId) return;
    try {
      await fetchAdminPledgeDetail();
    } catch (err) {
      console.error("Failed to fetch pledge detail:", err);
    }
  }, [fetchAdminPledgeDetail, pledgeId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">
        정보를 불러오는 중...
      </div>
    );
  if (!detail)
    return (
      <div className="p-10 text-center text-red-500">
        후원 정보를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          후원 상세 관리 (관리자)
        </h1>
        <Link
          href={ROUTES.ADMIN.PLEDGES}
          className="text-sm text-blue-600 hover:underline"
        >
          목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 기본 정보 */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-bold">
            후원 기본 정보
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">후원 ID</span>
              <span className="font-medium">#{detail.pledgeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">상태</span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-bold ${
                  detail.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : detail.status === "REFUNDED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {detail.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">보상 이행</span>
              <span className="text-sm font-medium">
                {detail.fulfillmentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">후원 일시</span>
              <span className="text-sm font-medium">
                {detail.createdAt
                  ? new Date(detail.createdAt).toLocaleString()
                  : "-"}
              </span>
            </div>
          </div>
        </section>

        {/* 후원자 정보 */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-bold">후원자 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">이름/닉네임</span>
              <span className="font-medium">
                {detail.user?.name} ({detail.user?.nickname})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">이메일</span>
              <span className="text-sm font-medium">{detail.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">연락처</span>
              <span className="text-sm font-medium">
                {detail.user?.phone || "-"}
              </span>
            </div>
          </div>
        </section>

        {/* 프로젝트 정보 */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-bold">
            프로젝트 정보
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">프로젝트 명</span>
              <span
                className="ml-4 truncate text-sm font-medium"
                title={detail.project?.projectTitle}
              >
                {detail.project?.projectTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">프로젝트 ID</span>
              <span className="font-medium">#{detail.project?.projectId}</span>
            </div>
          </div>
        </section>

        {/* 결제 정보 */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-bold">결제 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">후원 금액</span>
              <span className="font-bold text-blue-600">
                {detail.payment?.amount?.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">결제 수단</span>
              <span className="font-medium">
                {detail.payment?.paymentMethod}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex gap-4">
        {/* 필요시 관리자 기능(취소 강제, 상태 변경 등) 버튼 추가 가능 */}
        <button
          onClick={() => alert("추후 지원 예정 기능입니다.")}
          className="flex-1 rounded-xl bg-gray-100 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
        >
          관리 메모 추가
        </button>
      </div>
    </div>
  );
}
